const BackendPath = "http://localhost:5000/api/connection";
export const PostMessageCURD = async (payLoad) =>{
    try {
        const response = await fetch(`${BackendPath}/message/postmsg`,{
            method:"POST",
            credentials:"include",
            body:JSON.stringify(payLoad),
            headers: {
                "Content-Type": "application/json"
            },
        })
        if (!response.ok){
            throw new Error("Error in POST MessageCURD")
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log("Error Occered",error)
    }
}