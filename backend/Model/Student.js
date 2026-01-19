import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    // Reference to User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Education info
    institution: {
      type: String,
      trim: true,
    },

    course: {
      type: String,
      trim: true,
    },

    year: {
      type: Number,
      min: 1,
    },

    // Learning interests
    interests: [
      {
        type: String,
        trim: true,
      },
    ],

    // 🔥 Question activity
    questionsAsked: {
      type: Number,
      default: 0,
    },

    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    // 🔥 Answer activity (ADDED)
    answersGiven: {
      type: Number,
      default: 0,
    },

    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],

    acceptedAnswers: {
      type: Number,
      default: 0,
    },

    // 🔥 Reputation & rewards
    reputation: {
      type: Number,
      default: 0,
    },

    badges: [
      {
        type: String,
      },
    ],

    // Optional profile picture
    profilePicture: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("StudentProfile", studentProfileSchema);
