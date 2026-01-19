import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GetQuestionDetailsCURD } from "../CURD/PostCURD"
import { AddCommentCURD } from "../CURD/CommentCURD"
import { useAuth } from "../Context/AuthContent"
import { AddAnswerCURD } from "../CURD/AnswerCURD"

const DetailedQuestion = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuth()

  // Question + comments
  const [question, setQuestion] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Tabs
  const [activeTab, setActiveTab] = useState("comments")

  // Comment state
  const [showCommentBox, setShowCommentBox] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [postingComment, setPostingComment] = useState(false)

  // Answers state (MATCHES YOUR MODEL)
  const [answers, setAnswers] = useState([])
  const [showAnswerBox, setShowAnswerBox] = useState(false)
  const [answerTitle, setAnswerTitle] = useState("")
  const [answerText, setAnswerText] = useState("")
  const [answerCode, setAnswerCode] = useState("")
  const [postingAnswer, setPostingAnswer] = useState(false)

  // Fetch question + comments (+ answers later)
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await GetQuestionDetailsCURD(id)
        if (!res?.success) throw new Error(res?.message)

        setQuestion(res.value)
        setComments(res.comments || [])
        setAnswers(res.answers || []) // backend-ready
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestion()
  }, [id])

  // Add Comment
  const handleAddComment = async () => {
    if (!commentText.trim()) return

    try {
      setPostingComment(true)

      const payload = {
        content: commentText,
        author: user.id,
        question: question._id
      }

      const res = await AddCommentCURD(payload)
      if (!res?.success || !res?.value) return

      setComments(prev => [res.value, ...prev])
      setCommentText("")
      setShowCommentBox(false)
    } catch (err) {
      alert(err.message)
    } finally {
      setPostingComment(false)
    }
  }

  // Add Answer (MODEL-CORRECT)
  const handleAddAnswer = async () => {
    if (!answerTitle.trim() || !answerText.trim()) {
      alert("Title and answer are required.")
      return
    }
  
    if (!question?._id) {
      alert("Invalid question.")
      return
    }
  
    try {
      setPostingAnswer(true)
  
      const payload = {
        title: answerTitle.trim(),
        content: answerText.trim(),
        code: answerCode?.trim() || "",
        post: question._id,
        answeredBy: user.id
      }
  
      const response = await AddAnswerCURD(payload)
  
      if (!response?.success) {
        throw new Error(response?.message)
      }
  
      setAnswers(prev => [response.value, ...prev])
  
      // Reset UI
      setAnswerTitle("")
      setAnswerText("")
      setAnswerCode("")
      setShowAnswerBox(false)
  
    } catch (err) {
      console.error(err)
      alert(err.message)
    } finally {
      setPostingAnswer(false)
    }
  }
  

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* QUESTION CARD */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {question.title}
        </h1>

        <div className="flex gap-4 text-sm text-gray-500">
          <span>Field: {question.field}</span>
          <span>ID: {question._id}</span>
        </div>

        <p className="text-gray-800 leading-relaxed">
          {question.description}
        </p>

        {question.code && (
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{question.code}</code>
          </pre>
        )}
        {String(question.askedBy) === String(user?.id) && (
          <button
            onClick={() => navigate(`/content/question/edit/${question._id}`)}
            className="text-blue-600 text-sm"
          >
            Edit Question
          </button>
        )}
      </div>

      {/* COMMENTS | ANSWERS */}
      <div className="bg-white rounded-xl shadow p-6">

        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("comments")}
            className={`px-4 py-2 text-sm font-medium
              ${activeTab === "comments"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"}
            `}
          >
            Comments ({comments.length})
          </button>

          <button
            onClick={() => setActiveTab("answers")}
            className={`px-4 py-2 text-sm font-medium
              ${activeTab === "answers"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"}
            `}
          >
            Answers ({answers.length})
          </button>
        </div>

        {/* Sliding Panels */}
        <div className="relative overflow-hidden">
          <div
            className={`flex transition-transform duration-500 ease-in-out
              ${activeTab === "comments" ? "translate-x-0" : "-translate-x-full"}
            `}
          >

            {/* COMMENTS PANEL */}
            <div className="w-full flex-shrink-0 space-y-4">

              <div className="flex justify-end">
                <button
                  onClick={() => setShowCommentBox(prev => !prev)}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
                >
                  {showCommentBox ? "Cancel" : "Add Comment"}
                </button>
              </div>

              {showCommentBox && (
                <div className="space-y-3">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write your comment..."
                    className="w-full min-h-[100px] border rounded-lg p-3"
                  />

                  <button
                    onClick={handleAddComment}
                    disabled={postingComment}
                    className="px-5 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
                  >
                    {postingComment ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              )}

              {comments.length === 0 ? (
                <p className="text-gray-500 text-sm">No comments yet.</p>
              ) : (
                <ul className="space-y-3">
                  {comments
                    .filter(c => c && c.content)
                    .map(comment => (
                      <li
                        key={comment._id}
                        className="border rounded-lg p-3 text-sm"
                      >
                        {comment.content}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            {/* ANSWERS PANEL */}
            <div className="w-full flex-shrink-0 space-y-4">

              <div className="flex justify-end">
                <button
                  onClick={() => setShowAnswerBox(prev => !prev)}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
                >
                  {showAnswerBox ? "Cancel" : "Add Answer"}
                </button>
              </div>

              {showAnswerBox && (
                <div className="space-y-3">
                  <input
                    value={answerTitle}
                    onChange={(e) => setAnswerTitle(e.target.value)}
                    placeholder="Answer title"
                    className="w-full border rounded-lg p-3"
                  />

                  <textarea
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="Write your answer..."
                    className="w-full min-h-[140px] border rounded-lg p-3"
                  />

                  <textarea
                    value={answerCode}
                    onChange={(e) => setAnswerCode(e.target.value)}
                    placeholder="Optional code snippet"
                    className="w-full min-h-[100px] font-mono bg-slate-900 text-slate-100 rounded-lg p-3"
                  />

                  <button
                    onClick={handleAddAnswer}
                    disabled={postingAnswer}
                    className="px-5 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
                  >
                    {postingAnswer ? "Posting..." : "Post Answer"}
                  </button>
                </div>
              )}

              {answers.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No answers yet. Be the first to answer.
                </p>
              ) : (
                <ul className="space-y-4">
                  {answers
                    .filter(a => a && a.content)
                    .map(answer => (
                      <li
                        key={answer._id}
                        className="border rounded-lg p-4 bg-gray-50"
                      >
                        <h4 className="font-semibold mb-2">
                          {answer.title}
                        </h4>

                        <p className="text-sm mb-2">
                          {answer.content}
                        </p>

                        {answer.code && (
                          <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg text-sm overflow-x-auto">
                            <code>{answer.code}</code>
                          </pre>
                        )}
                      </li>
                    ))}
                </ul>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default DetailedQuestion
