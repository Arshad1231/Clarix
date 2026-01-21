import Answer from "../Model/Answer.js"
import Comment from "../Model/Comment.js"
import Post from "../Model/Post.js"
import Student from "../Model/Student.js"
import TeacherProfile from "../Model/TeacherProfile.js"

export const PostsAskController = async (req,res)=>{
    try {
        const {title,description,field,code,language,error,expectedBehavior,actualBehavior} = req.body
        const askedBy = req.session.user.id
        const newPost = new Post({title,description,field,code,language,error,expectedBehavior,actualBehavior,askedBy})
        await newPost.save();

        if (req.session.user.role == "student"){
            await Student.findByIdAndUpdate(askedBy, {
                $push: { questions: newPost._id },
                $inc:{questionsAsked:1}
            })
            
        }
        
        if (req.session.user.role == "teacher"){
            await TeacherProfile.findByIdAndUpdate(askedBy,{
                $push:{question:newPost._id},
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
  
      const question = await Post.findById(id)
      if (!question) {
        return res.status(404).json({
          message: "Question not found!",
          success: false
        })
      }
  
      const comments = await Comment.find({ question: id })
        .sort({ createdAt: -1 })
      const answers = await Answer.find({post:id})
  
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
  