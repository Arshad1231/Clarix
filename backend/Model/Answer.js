import mongoose from "mongoose"

const answerSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            requried:true,
            trim:true
        },
        content:{
            type:String,
            required:true
        },
        code:{
            type:String,
            default:""
        },
        post:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post",
            required:true
        },
        answeredBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        // 👍👎 Voting (recommended structure)
        likes: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            },
        ],
    
        dislikes: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            },
        ],
    
        // 💬 Comments on this answer
        comments: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            },
        ],
  
    },{
        timestamps:true,
    }
);
export default mongoose.model("Answer",answerSchema)