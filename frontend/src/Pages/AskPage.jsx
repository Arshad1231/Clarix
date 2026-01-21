import { useState } from "react";
import Editor from "@monaco-editor/react";
import { PostAskCURD } from "../CURD/PostCURD";
import { useNavigate } from "react-router-dom";

export default function AskPost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    field: "",
    code: "",
    language: "",
    error: "",
    expectedBehavior: "",
    actualBehavior: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await PostAskCURD(formData);
    if (response?.success) {
      navigate("/content/home");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 font-body">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT INDICATOR PANEL */}
        <div className="hidden lg:block">
          <div className="sticky top-24 rounded-xl bg-white shadow p-5 border-l-4 border-red-500">
            <h2 className="font-heading-two text-lg text-gray-900 mb-4">
              How to ask a good question
            </h2>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <span className="font-semibold text-red-500">Title:</span>{" "}
                Be specific and concise
              </li>
              <li>
                <span className="font-semibold text-red-500">Field:</span>{" "}
                Choose the relevant domain
              </li>
              <li>
                <span className="font-semibold text-red-500">Description:</span>{" "}
                Explain the problem clearly
              </li>
              <li>
                <span className="font-semibold text-red-500">Code:</span>{" "}
                Share only the relevant snippet
              </li>
              <li>
                <span className="font-semibold text-red-500">Error:</span>{" "}
                Paste the exact error message
              </li>
              <li>
                <span className="font-semibold text-red-500">Expected:</span>{" "}
                What you wanted to happen
              </li>
              <li>
                <span className="font-semibold text-red-500">Actual:</span>{" "}
                What actually happened
              </li>
            </ul>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 rounded-xl bg-white p-8 shadow space-y-6 border-t-4 border-red-500"
        >
          <h1 className="text-2xl font-heading-two text-gray-900">
            Ask a Question
          </h1>

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Short and clear question title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          {/* FIELD */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Field / Domain
            </label>
            <select
              name="field"
              value={formData.field}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            >
              <option value="">Select field</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="DevOps">DevOps</option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Explain your problem in detail"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          {/* LANGUAGE */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Programming Language
            </label>
            <input
              type="text"
              name="language"
              placeholder="e.g. JavaScript, Python"
              value={formData.language}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          {/* CODE */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Code (optional)
            </label>
            <div className="overflow-hidden rounded-md border border-gray-300">
              <Editor
                height="300px"
                language={formData.language || "javascript"}
                theme="vs-dark"
                value={formData.code}
                onChange={(value) =>
                  setFormData({ ...formData, code: value || "" })
                }
              />
            </div>
          </div>

          {/* ERROR */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Error Message
            </label>
            <textarea
              name="error"
              rows="3"
              placeholder="Paste the exact error"
              value={formData.error}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-red-300 bg-red-50 px-3 py-2 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          {/* EXPECTED */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expected Behavior
            </label>
            <textarea
              name="expectedBehavior"
              rows="3"
              value={formData.expectedBehavior}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          {/* ACTUAL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Actual Behavior
            </label>
            <textarea
              name="actualBehavior"
              rows="3"
              value={formData.actualBehavior}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          {/* SUBMIT */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-red-500 px-6 py-2 text-white font-medium hover:bg-red-600 focus:ring-2 focus:ring-red-500"
            >
              Post Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
