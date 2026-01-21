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
          setQuestions(res.questions || []);
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
    return (
      <div className="p-6 text-sm text-gray-500 font-body">
        Loading your questions…
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="p-6 text-sm text-gray-500 font-body">
        You haven’t asked any questions yet.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto font-body">
      {/* HEADER */}
      <h1 className="text-2xl font-heading-two text-gray-900 mb-6">
        My Questions
      </h1>

      <div className="space-y-4">
        {questions.map((q) => (
          <div
            key={q._id}
            className="
              bg-white
              rounded-xl
              shadow
              p-5
              flex justify-between items-start
              border-l-4 border-red-500
              hover:shadow-lg
              transition-all
            "
          >
            {/* LEFT */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {q.title}
              </h2>

              <p className="text-sm text-red-500 mt-1 font-medium">
                {q.field}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Asked on {new Date(q.createdAt).toDateString()}
              </p>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex gap-2">
              <button
                onClick={() =>
                  navigate(`/content/question/edit/${q._id}`)
                }
                className="
                  px-4 py-2 text-sm font-semibold rounded
                  bg-red-500 text-white
                  hover:bg-red-600
                  transition
                "
              >
                Edit
              </button>

              <button
                onClick={() =>
                  navigate(`/content/question/${q._id}`)
                }
                className="
                  px-4 py-2 text-sm font-semibold rounded
                  border border-red-500 text-red-500
                  hover:bg-red-50
                  transition
                "
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsAsked;
