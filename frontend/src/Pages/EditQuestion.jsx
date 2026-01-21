import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetQuestionDetailsCURD } from "../CURD/PostCURD";
import { useAuth } from "../Context/AuthContent";

const EditQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [field, setField] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [expectedBehavior, setExpectedBehavior] = useState("");
  const [actualBehavior, setActualBehavior] = useState("");

  /* ---------------- FETCH QUESTION ---------------- */
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await GetQuestionDetailsCURD(id);
        if (!res?.success) throw new Error(res?.message);

        const q = res.value;

        if (q.askedBy && String(q.askedBy) !== String(user?._id)) {
          navigate(-1);
          return;
        }

        setTitle(q.title || "");
        setField(q.field || "");
        setLanguage(q.language || "");
        setDescription(q.description || "");
        setCode(q.code || "");
        setErrorMsg(q.error || "");
        setExpectedBehavior(q.expectedBehavior || "");
        setActualBehavior(q.actualBehavior || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id, navigate, user]);

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and description are required");
      return;
    }

    try {
      setSaving(true);

      // 🔁 Replace later with EditQuestionCURD API
      console.log("UPDATED QUESTION:", {
        title,
        field,
        language,
        description,
        code,
        error: errorMsg,
        expectedBehavior,
        actualBehavior,
      });

      // ✅ GO BACK
      navigate(-1);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- UI ---------------- */

  const baseInput =
    "w-full rounded-lg p-3 border border-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/30 focus:outline-none";

  if (loading) {
    return (
      <p className="mt-10 text-center text-sm text-gray-500 font-body">
        Loading question…
      </p>
    );
  }

  if (error) {
    return (
      <p className="mt-10 text-center text-sm text-red-500 font-body">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 font-body">
      {/* HEADER */}
      <h1 className="text-2xl font-heading-two text-gray-900 border-l-4 border-red-500 pl-3">
        Edit Question
      </h1>

      <Field label="Title">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={baseInput}
        />
      </Field>

      <Field label="Field / Domain">
        <input
          value={field}
          onChange={(e) => setField(e.target.value)}
          placeholder="Frontend, Backend, AI"
          className={baseInput}
        />
      </Field>

      <Field label="Programming Language">
        <input
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="JavaScript, Python, Java"
          className={baseInput}
        />
      </Field>

      <Field label="Description">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${baseInput} min-h-[150px]`}
        />
      </Field>

      <Field label="Code (optional)">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="
            w-full min-h-[120px] rounded-lg p-3 font-mono text-sm
            bg-slate-900 text-slate-100
            border border-slate-600
            focus:border-red-500 focus:ring-2 focus:ring-red-500/30
            focus:outline-none
          "
        />
      </Field>

      <Field label="Error Message">
        <textarea
          value={errorMsg}
          onChange={(e) => setErrorMsg(e.target.value)}
          className="
            w-full min-h-[100px] rounded-lg p-3
            bg-red-50 border border-red-400
            focus:border-red-500 focus:ring-2 focus:ring-red-500/30
            focus:outline-none
          "
        />
      </Field>

      <Field label="Expected Behavior">
        <textarea
          value={expectedBehavior}
          onChange={(e) => setExpectedBehavior(e.target.value)}
          className={`${baseInput} min-h-[100px]`}
        />
      </Field>

      <Field label="Actual Behavior">
        <textarea
          value={actualBehavior}
          onChange={(e) => setActualBehavior(e.target.value)}
          className={`${baseInput} min-h-[100px]`}
        />
      </Field>

      {/* ACTIONS */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="
            px-6 py-2 rounded-lg
            bg-red-500 text-white font-semibold
            hover:bg-red-600
            disabled:opacity-50
            transition
          "
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="
            px-6 py-2 rounded-lg
            border border-gray-400 text-gray-700
            hover:bg-gray-100
            transition
          "
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

/* ---------------- FIELD WRAPPER ---------------- */

const Field = ({ label, children }) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    {children}
  </div>
);

export default EditQuestion;
