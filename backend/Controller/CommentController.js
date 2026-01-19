import Comment from "../Model/Comment.js"
import Post from "../Model/Post.js"

export const PostCommentController = async (req,res)=>{
    try {
        const {author,content,question} = req.body
        if (!author || !content || !question){
            return res.status(404).json({
                message:"Fields are missing",
                success:false
            })
        }

        const NewComment = new Comment({author,content,question})
        const existingPost = await  Post.findById(question)
        if(!existingPost){
            return res.status(404).json({
                message:"Post is missing",
                success:false
            })
        }
        await NewComment.save()
        existingPost.comment.push(NewComment._id)
        await existingPost.save()
        res.status(201).json({
            success: true,
            message: "Comment saved successfully",
            value:NewComment
        })
    } catch (error) {
        console.log("error Occured in Post Comment Controller",error)
        res.status(500).json({
            message:error.message
        })
    }
}