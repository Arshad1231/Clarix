import Answer from "../Model/Answer.js"
import Post from "../Model/Post.js"

export const PostAnswerController = async (req, res) => {
  try {
    const { title, content, code, post,answeredBy } = req.body

    // ✅ 1. Basic validation
    if (!title || !content || !post) {
      return res.status(400).json({
        success: false,
        message: "Title, content, and post ID are required"
      })
    }

    // ✅ 2. Make sure question/post exists
    const question = await Post.findById(post)
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found"
      })
    }

   

    // ✅ 3. Create answer
    const newAnswer = await Answer.create({
      title,
      content,
      code: code || "",
      post,
      answeredBy,
      likes: [],
      dislikes: [],
      comments: []
    })

    // ✅ 4. (Optional but recommended) Attach answer to question
    question.answer.push(newAnswer._id)
    await question.save()

    // ✅ 5. Send response
    res.status(201).json({
      success: true,
      message: "Answer posted successfully",
      value: newAnswer
    })

  } catch (error) {
    console.log("Error Occured in the Post Answer Controller", error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
