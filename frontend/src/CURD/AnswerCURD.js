const BackendPath = "http://localhost:5000/api/connection";

export const AddAnswerCURD = async(Answer)=>{
    try {
      const response = await fetch(`${BackendPath}/answer/postanswer`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(Answer),
        credentials:"include"
      })
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to post question");
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.log("Error Occured in the Add Answer CURD",error)
    }
}