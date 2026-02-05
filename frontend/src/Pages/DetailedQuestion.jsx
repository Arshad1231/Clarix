import React, { useEffect, useState,useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GetQuestionDetailsCURD, HandleVoteCURD } from "../CURD/PostCURD"
import { AddCommentCURD } from "../CURD/CommentCURD"
import { useAuth } from "../Context/AuthContent"
import { AddAnswerCURD } from "../CURD/AnswerCURD"
import socket from "../socket"

const DetailedQuestion = () => {
  const hasFetched = useRef(false)
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
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchQuestion = async () => {
      try {
        const res = await GetQuestionDetailsCURD(id)
        if (!res?.success) throw new Error(res?.message)
          console.log(res.value._id)
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
  useEffect(() => {
    socket.emit("joinPostRoom", id);
  
    const handleViewsUpdate = ({ postId, views }) => {
      if (postId === id) {
        setQuestion(prev => prev ? { ...prev, views } : prev);
      }
    };
  
    const handleVoteUpdate = ({ postId, upvotes, downvotes }) => {
      if (postId === id) {
        setQuestion(prev => ({
          ...prev,
          upvotes,
          downvotes,
        }));
      }
    };
  
    socket.on("viewsUpdated", handleViewsUpdate);
    socket.on("voteUpdated", handleVoteUpdate);
  
    return () => {
      socket.emit("leavePostRoom", id);
      socket.off("viewsUpdated", handleViewsUpdate);
      socket.off("voteUpdated", handleVoteUpdate);
    };
  }, [id]);
  


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
  
  const HandleVote = async (type) => {
    try {
      const res = await HandleVoteCURD(id, type);
  
      if (!res?.success) return;
      
      // 🔥 UPDATE YOUR OWN UI IMMEDIATELY
    setQuestion(prev => ({
      ...prev,
      upvotes: res.upvotes,
      downvotes: res.downvotes,
    }));
     
  
    } catch (error) {
      alert(error.message);
    }
  };
  
  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>

  const hasUpvoted =
  question?.upvotes?.some(
    (id) => id.toString() === user?.id
  );

  const hasDownvoted =
    question?.downvotes?.some(
      (id) => id.toString() === user?.id
    );

  

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
  
      {/* QUESTION CARD */}
      <div className="bg-white rounded-2xl shadow border border-red-100 p-6 space-y-5">
  
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">
          {question.title}
        </h1>
  
        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span className="px-2 py-1 bg-red-50 text-red-600 rounded-md">
            {question.field}
          </span>
          <span>Views: <span className="font-medium">{question.views}</span></span>
          <span>
            Last active:{" "}
            <span className="font-medium">
              {new Date(question.lastActivityAt).toLocaleString()}
            </span>
          </span>
        </div>
  
        {/* Status */}
        <span
          className={`inline-block w-fit px-3 py-1 text-xs rounded-full font-semibold
            ${question.status === "solved"
              ? "bg-green-100 text-green-700"
              : question.status === "answered"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"}
          `}
        >
          {question.status.toUpperCase()}
        </span>
  
        {/* Description */}
        <p className="text-gray-800 leading-relaxed">
          {question.description}
        </p>
  
        {/* Tags */}
        {question.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {question.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-red-50 text-red-600 border border-red-100"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
  
        {/* Voting */}
        <div className="flex items-center gap-6 pt-2">

        {/* UPVOTE */}
        <button
          onClick={() => HandleVote("upvote")}
          className={`flex items-center gap-1 text-sm transition
            ${hasUpvoted
              ? "text-red-600 font-semibold"
              : "text-gray-600 hover:text-red-600"}
          `}
        >
          👍 <span>{question.upvotes?.length || 0}</span>
        </button>

        {/* DOWNVOTE */}
        <button
          onClick={() => HandleVote("downvote")}
          className={`flex items-center gap-1 text-sm transition
            ${hasDownvoted
              ? "text-red-600 font-semibold"
              : "text-gray-600 hover:text-red-600"}
          `}
        >
          👎 <span>{question.downvotes?.length || 0}</span>
        </button>

        </div>

  
        {/* Actions */}
        {String(question.askedBy) === String(user?.id) && (
          <button
            onClick={() => navigate(`/content/question/edit/${question._id}`)}
            className="text-sm text-red-600 hover:underline"
          >
            ✏️ Edit Question
          </button>
        )}
      </div>
  
      {/* COMMENTS / ANSWERS */}
      <div className="bg-white rounded-2xl shadow border border-red-100 p-6">
  
        {/* Tabs */}
        <div className="flex gap-6 border-b border-red-100 mb-6">
          <button
            onClick={() => setActiveTab("comments")}
            className={`pb-2 text-sm font-semibold
              ${activeTab === "comments"
                ? "border-b-2 border-red-500 text-red-600"
                : "text-gray-500 hover:text-red-500"}
            `}
          >
            Comments ({comments.length})
          </button>
  
          <button
            onClick={() => setActiveTab("answers")}
            className={`pb-2 text-sm font-semibold
              ${activeTab === "answers"
                ? "border-b-2 border-red-500 text-red-600"
                : "text-gray-500 hover:text-red-500"}
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
  
            {/* COMMENTS */}
            <div className="w-full flex-shrink-0 space-y-4">
  
              <div className="flex justify-end">
                <button
                  onClick={() => setShowCommentBox(prev => !prev)}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
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
                    className="w-full min-h-[100px] border border-red-200 rounded-lg p-3 focus:ring-1 focus:ring-red-400"
                  />
  
                  <button
                    onClick={handleAddComment}
                    disabled={postingComment}
                    className="px-5 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50"
                  >
                    {postingComment ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              )}
  
              {comments.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No comments yet.
                </p>
              ) : (
                <ul className="space-y-3">
                  {comments.map(comment => (
                    <li
                      key={comment._id}
                      className="border border-red-100 rounded-lg p-3 text-sm bg-red-50"
                    >
                      {comment.content}
                    </li>
                  ))}
                </ul>
              )}
            </div>
  
            {/* ANSWERS */}
            <div className="w-full flex-shrink-0 space-y-4">
  
              <div className="flex justify-end">
                <button
                  onClick={() => setShowAnswerBox(prev => !prev)}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  {showAnswerBox ? "Cancel" : "Add Answer"}
                </button>
              </div>
  
              {answers.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No answers yet. Be the first to answer.
                </p>
              ) : (
                <ul className="space-y-4">
                  {answers.map(answer => (
                    <li
                      key={answer._id}
                      className="border border-red-100 rounded-xl p-4 bg-red-50"
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
  );
  
}

export default DetailedQuestion
