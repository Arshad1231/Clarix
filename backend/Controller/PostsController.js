import Answer from "../Model/Answer.js"
import Comment from "../Model/Comment.js"
import Post from "../Model/Post.js"
import Student from "../Model/Student.js"
import TeacherProfile from "../Model/TeacherProfile.js"

export const PostsAskController = async (req,res)=>{
    try {
        const {title,description,field,code,tags,language,error,expectedBehavior,actualBehavior} = req.body
        if (!title || !description || !field) {
          return res.status(400).json({
            success: false,
            message: "Title, description and field are required"
          });
        }
        let normalizedTags = [];

        if (Array.isArray(tags)) {
          normalizedTags = tags
            .map(tag => tag.trim().toLowerCase())
            .filter(tag => tag.length > 0)
            .slice(0, 5); // limit to 5 tags
        }
        
        
        
        const askedBy = req.session.user.id
        const newPost = new Post({
          title,
          description,
          field,
          code,
          language,
          error,
          expectedBehavior,
          actualBehavior,
          tags: normalizedTags,
          askedBy,
        });
        await newPost.save();

        if (req.session.user.role == "student"){
            await Student.findByIdAndUpdate(askedBy, {
                $push: { questions: newPost._id },
                $inc:{questionsAsked:1}
            })
            
        }
        
        if (req.session.user.role == "teacher"){
            await TeacherProfile.findByIdAndUpdate(askedBy,{
                $push:{questions:newPost._id},
                $inc:{questionsAsked:1}
            })
        }

        
        
        res.status(200).json({
            message:"post Successfully Saved",
            success:true  
        })

        
    } catch (error) {
        console.log("Error Occured in the PostsAskController",error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const GetAskedQuestionsController = async (req, res) => {
    try {
      // 1️⃣ Auth check
      if (!req.session?.user?.id) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
  
      const userId = req.session.user.id;
  
      // 2️⃣ Fetch questions asked by user
      const questions = await Post.find({ askedBy: userId })
        .populate("askedBy", "name username email")
        .sort({ createdAt: -1 });
  
      // 3️⃣ Send response
      return res.status(200).json({
        success: true,
        count: questions.length,
        questions,
      });
  
    } catch (error) {
      console.error("Error in GetAskedQuestionsController:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch asked questions",
      });
    }
  };


  export const GetDetailsController = async (req, res) => {
    try {
      const { id } = req.params
  
      if (!id) {
        return res.status(400).json({
          message: "Need the Id",
          success: false
        })
      }
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
          $inc: { views: 1 },
          $set: { lastActivityAt: new Date() }
        },
        { new: true }
      );
      const question = updatedPost
      if (!question) {
        return res.status(404).json({
          message: "Question not found!",
          success: false
        })
      }
  
      const comments = await Comment.find({ question: id })
        .sort({ createdAt: -1 })
      const answers = await Answer.find({post:id})

      req.io.to(`post:${id}`).emit("viewsUpdated", {
        id,
        views: updatedPost.views
      });
  
      res.status(200).json({
        message: "Question Found!",
        success: true,
        value: question,
        comments,
        answers
      })
    } catch (error) {
      console.log("Error Occured in the Get DetailsController", error)
      res.status(500).json({
        message: error.message
      })
    }
  }

  export const ScrollPostController = async (req, res) => {
    try {
      const skip = parseInt(req.query.skip, 10) || 0;
      const limit = 8;
  
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
  
      res.json({
        success: true,
        posts,
      });
    } catch (error) {
      console.log("Error Occurred in ScrollPostController", error);
      res.status(500).json({
        message: error.message,
      });
    }
  };

  export const HandleVoteController = async (req, res) => {
    try {
      const { id: postId } = req.params;
      const { type } = req.body; // "upvote" | "downvote"
      const userId = req.session?.user?.id;
  
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
  
      if (!["upvote", "downvote"].includes(type)) {
        return res.status(400).json({
          success: false,
          message: "Invalid vote type",
        });
      }
  
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
      const hasUpvoted = post.upvotes.some(
        (id) => id.toString() === userId
      );
  
      const hasDownvoted = post.downvotes.some(
        (id) => id.toString() === userId
      );
  
      // 🔄 TOGGLE / SWITCH LOGIC
      if (type === "upvote") {
        if (hasUpvoted) {
          post.upvotes.pull(userId);
        } else {
          post.upvotes.push(userId);
          if (hasDownvoted) {
            post.downvotes.pull(userId);
          }
        }
      }
  
      if (type === "downvote") {
        if (hasDownvoted) {
          post.downvotes.pull(userId);
        } else {
          post.downvotes.push(userId);
          if (hasUpvoted) {
            post.upvotes.pull(userId);
          }
        }
      }
  
      await post.save();
  
      // 🔔 REAL-TIME UPDATE
      req.io.to(`post:${postId}`).emit("voteUpdated", {
        postId,
        upvotes: post.upvotes,
        downvotes: post.downvotes,
      });
  
      res.status(200).json({
        success: true,
        upvotes: post.upvotes,
        downvotes: post.downvotes,
      });
  
    } catch (error) {
      console.error("Error in HandleVoteController:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  
  