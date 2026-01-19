import { useState } from "react";
import Editor from "@monaco-editor/react";
import { PostAskCURD } from "../CURD/PostCURD";
import { useNavigate } from "react-router-dom";


export default function AskPost() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    field: "",
    code: "",
    language: "javascript",
    error: "",
    expectedBehavior: "",
    actualBehavior: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await PostAskCURD(formData)
    if(response.success){
      navigate("/content/home")
      
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-4xl space-y-6 rounded-xl bg-white p-8 shadow-md"
      >
        <h1 className="text-2xl font-semibold text-gray-800">
          Ask a Question
        </h1>

        {/* Title */}
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
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Field / Domain
          </label>
          <select
            name="field"
            value={formData.field}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select field</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="DevOps">DevOps</option>
          </select>
        </div>

        {/* Description */}
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
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">
                Programming Language
            </label>
            <input
                type="text"
                name="language"
                placeholder="e.g. JavaScript, Python, Java"
                value={formData.language}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
        </div>

        {/* Code Editor */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Code (optional)
          </label>
          <div className="overflow-hidden rounded-md border border-gray-300">
            <Editor
              height="300px"
              language={formData.language}
              theme="vs-dark"
              value={formData.code}
              onChange={(value) =>
                setFormData({ ...formData, code: value || "" })
              }
            />
          </div>
        </div>

        {/* Error */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Error Message
          </label>
          <textarea
            name="error"
            rows="3"
            placeholder="Paste the exact error or stack trace"
            value={formData.error}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-red-300 bg-red-50 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>

        {/* Expected Behavior */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expected Behavior
          </label>
          <textarea
            name="expectedBehavior"
            rows="3"
            value={formData.expectedBehavior}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Actual Behavior */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Actual Behavior
          </label>
          <textarea
            name="actualBehavior"
            rows="3"
            value={formData.actualBehavior}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Post Question
          </button>
        </div>
      </form>
    </div>
  );
}
