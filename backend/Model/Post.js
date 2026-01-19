import mongoose from "mongoose"

const postSchema = mongoose.Schema({
   
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,

    },
    field:{
        type:String,
        require:true,
    },
    code: {
      type: String
    },
    language:{
      type:String
    },
    error:{
      type:String
    },
    expectedBehavior: {
        type: String
    },
  
    actualBehavior: {
      type: String
    },
    answer:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Answer"
      }

    ],
    comment:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
      }
    ],
    askedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
    },
    {
      timestamps: true // adds createdAt & updatedAt
    }
)
export default mongoose.model("Post", postSchema);
