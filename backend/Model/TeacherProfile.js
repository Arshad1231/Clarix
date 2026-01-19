import mongoose from "mongoose";

const teacherProfileSchema = new mongoose.Schema(
  {
    // Reference to the User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Professional information
    organization: {
      type: String,
      trim: true,
    },

    designation: {
      type: String, // Lecturer, Professor, Software Engineer, etc.
      trim: true,
    },

    qualification: {
      type: String, // MSc, PhD, B.Tech, etc.
      trim: true,
    },

    // Areas of expertise
    specializations: [
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

    // 🔥 Answer activity
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

    // Accepted answers count
    acceptedAnswers: {
      type: Number,
      default: 0,
    },

    // Reputation system
    reputation: {
      type: Number,
      default: 0,
    },

    // Badges / achievements
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

export default mongoose.model("TeacherProfile", teacherProfileSchema);
