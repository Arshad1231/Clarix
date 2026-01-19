import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAskedQuestionsCURD } from "../CURD/PostCURD";

const QuestionsAsked = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await GetAskedQuestionsCURD();
        if (res?.success) {
          setQuestions(res.questions);
        }
      } catch (error) {
        console.error("Failed to fetch questions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <div className="p-6">Loading your questions...</div>;
  }

  if (questions.length === 0) {
    return <div className="p-6">You haven’t asked any questions yet.</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Questions</h1>

      <div className="space-y-4">
        {questions.map((q) => (
          <div
            key={q._id}
            className="bg-white rounded-xl shadow p-5 flex justify-between items-start"
          >
            {/* LEFT */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {q.title}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Field: {q.field}
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Asked on {new Date(q.createdAt).toDateString()}
              </p>
            </div>

            {/* RIGHT */}
            <button
              onClick={() => navigate(`/content/question/edit/${q._id}`)}
              className="h-fit px-4 py-2 text-sm font-semibold rounded bg-black text-white hover:bg-gray-800"
            >
              Edit
            </button>
            {/* RIGHT */}
            <button
              onClick={() => navigate(`/content/question/${q._id}`)}
              className="h-fit px-4 py-2 text-sm font-semibold rounded bg-black text-white hover:bg-gray-800"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsAsked;
