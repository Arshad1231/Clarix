import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    description: {
      type: String,
      required: true
    },

    field: {
      type: String,
      required: true,
      index: true // helps filtering
    },

    tags: [
      {
        type: String,
        index: true
      }
    ],

    code: {
      type: String
    },

    language: {
      type: String
    },

    error: {
      type: String
    },

    expectedBehavior: {
      type: String
    },

    actualBehavior: {
      type: String
    },

    askedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer"
      }
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],

    // 🚀 PERFORMANCE FIELDS
    answerCount: {
      type: Number,
      default: 0
    },

    commentCount: {
      type: Number,
      default: 0
    },

    views: {
      type: Number,
      default: 0
    },

    // 👍 VOTING SYSTEM
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    downvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    // ✅ STATUS
    status: {
      type: String,
      enum: ["open", "answered", "solved"],
      default: "open"
    },

    // 🛑 MODERATION
    isDeleted: {
      type: Boolean,
      default: false
    },

    // 🔔 REAL-TIME / SOCKET SUPPORT
    lastActivityAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Post", postSchema);
