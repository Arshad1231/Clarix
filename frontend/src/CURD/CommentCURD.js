const BackendPath = "http://localhost:5000/api/connection";

export const AddCommentCURD = async(comment)=>{
    try {
      const response = await fetch(`${BackendPath}/comment/postcomment`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(comment),
        credentials:"include"
      })
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to post question");
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.log("Error Occured in the Add Comment CURD",error)
    }
}