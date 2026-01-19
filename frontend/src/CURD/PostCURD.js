const BackendPath = "http://localhost:5000/api/connection";

export const PostAskCURD = async (formData) => {
  try {
    const response = await fetch(`${BackendPath}/questions/post`, {
      method: "POST",
      credentials: "include", // send cookies (auth)
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to post question");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error occurred in PostAskCURD:", error.message);
    return { success: false, message: error.message };
  }
};

export const GetAskedQuestionsCURD = async()=>{
  try {
    const response = await fetch(`${BackendPath}/questions/getaskquestions`,{
      method:"GET",
      credentials:"include"
    })

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to post question");
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.log("error Occured in the GetAsked QuestionCURD",error)
    return{message:error.message}
  }
}

export const GetQuestionDetailsCURD = async(id)=>{
  try {
    const response = await fetch(`${BackendPath}/questions/details/${id}`,{
      method:"GET",
      credentials:"include"
    })
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to post question");
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.log("Error Occured in the GetQuestionDetails",error)
  }
}
export const GetPostsForScrollCURD = async(postsLoaded)=>{
  try {

    const response = await fetch(`${BackendPath}/questions/getposts?skip=${postsLoaded}`,{
      method:"GET",
      credentials:"include"
    })
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to post question");
    }
    const data = await response.json()
    return data
    
  } catch (error) {
    console.log("Error Occured in the GetPostsForScrollCURD",error)
  }
}
