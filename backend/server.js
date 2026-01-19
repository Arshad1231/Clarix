import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";


dotenv.config();

const app = express();
const server = http.createServer(app);




// Middlewares
app.use("/uploads", express.static("uploads"));
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// 🔐 SESSION CONFIG
app.use(
  session({
    name: "session", // cookie name
    secret: process.env.SESSION_SECRET || "mysecretkey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions",
    }),
    secure:false,
    sameSite:"lax",
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

const PORT = process.env.PORT || 5000;

//Routers 
import UserRouter from "./Router/UserRouter.js";
import PostsRouter from "./Router/PostsRouter.js";
import CommentRouter from "./Router/CommentRouter.js";
import AnswerRouter from "./Router/AnswerRouter.js";
import ChatRouter from "./Router/ChatRouter.js";
import MessagesRouter from "./Router/MessagesRouter.js";

app.use("/api/connection/questions",PostsRouter);
app.use("/api/connection/user",UserRouter);
app.use("/api/connection/comment",CommentRouter)
app.use("/api/connection/answer",AnswerRouter)
app.use("/api/connection/chat",ChatRouter)
app.use("/api/connection/message",MessagesRouter)


io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  // Join a chat room
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat room: ${chatId}`);
  });

  // Receive message & broadcast
  socket.on("sendMessage", (message) => {
    socket.to(message.chatId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");

    server.listen(PORT, () => {
      console.log(`🚀 Server + Socket.IO running on port ${PORT}`);
    });
    
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
