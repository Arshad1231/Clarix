const BackendPath = "http://localhost:5000/api/connection";

export const GetChatCURD = async (activeChatId) =>{
    try {
        const response = await fetch(`${BackendPath}/chat/getwindow/${activeChatId}`,{
            method:"GET",
            credentials:"include",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log("Error Occuured in teh GetCharCURD",error)
        throw new Error(error.message)
    }
}
export const getChatIdCURD = async (friend) =>{
    try {
        const response = await fetch(`${BackendPath}/chat/getchatid/${friend._id}`,{
            method:"GET",
            credentials:"include",
            headers: {
                "Content-Type": "application/json"
            },
        })
        // Handle HTTP errors
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message );
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log("Error Occuured in teh GetCharCURD",error)
        throw new Error(error.message)
    }
}
