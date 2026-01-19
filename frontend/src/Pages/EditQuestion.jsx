import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { GetQuestionDetailsCURD } from "../CURD/PostCURD"
import { useAuth } from "../Context/AuthContent"

const EditQuestion = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  // Editable fields
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [code, setCode] = useState("")
  const [field, setField] = useState("")

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await GetQuestionDetailsCURD(id)
        if (!res?.success) throw new Error(res?.message)

        const question = res.value

        // 🔐 Optional ownership check (recommended)
        if (question.postedBy && String(question.postedBy) !== String(user?.id)) {
          navigate(-1)
          return
        }

        setTitle(question.title)
        setDescription(question.description)
        setCode(question.code || "")
        setField(question.field || "")
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestion()
  }, [id, navigate, user])

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and description are required")
      return
    }

    try {
      setSaving(true)

      // ⛔ Backend API not wired yet
      // Replace this later with EditQuestionCURD
      console.log("UPDATED QUESTION:", {
        title,
        description,
        code,
        field
      })

      // TEMP: go back to question page
      navigate(-1)
    } catch (err) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

      <h1 className="text-2xl font-bold text-gray-900">
        Edit Question
      </h1>

      {/* Title */}
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Question title"
        className="w-full border rounded-lg p-3"
      />

      {/* Field */}
      <input
        value={field}
        onChange={e => setField(e.target.value)}
        placeholder="Field (e.g. Web, AI, Backend)"
        className="w-full border rounded-lg p-3"
      />

      {/* Description */}
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Question description"
        className="w-full min-h-[150px] border rounded-lg p-3"
      />

      {/* Code */}
      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="Optional code snippet"
        className="w-full min-h-[120px] font-mono bg-slate-900 text-slate-100 rounded-lg p-3"
      />

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-400 text-white rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default EditQuestion
