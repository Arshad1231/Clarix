import React, { useEffect, useState } from "react"
import { GetAllUsersCURD,AcceptRequestCURD,RejectRequestCURD } from "../CURD/UserCURD"
import UserCard from "./Components/UserCard.jsx"
import { useAuth } from "../Context/AuthContent.jsx"

const ManageFriendShip = () => {
  const { user , refreshUser} = useAuth()

  const [suggestions, setSuggestions] = useState([])
  const [requests, setRequests] = useState([])

  useEffect(() => {
    const GetUsers = async () => {
      const res = await GetAllUsersCURD()
      if (!res?.success) return

      const sugg = []
      const req = []

      res.value.forEach(friend => {
        if (user.friendRequests.includes(friend._id)) {
          req.push(friend)
        } else {
          sugg.push(friend)
        }
      })

      setSuggestions(sugg)
      setRequests(req)
    }

    if (user?.friendRequests) {
      GetUsers()
    }
  }, [user.friendRequests,user.friends,user.sentRequests])
  const HandleAcceptRequest = async (friend)=>{
    try {
        const details ={
            friendId: friend._id
        }
        const response = await AcceptRequestCURD(details)
        if (response.success){
            await refreshUser()
        }
        else{
            throw new Error("Error Occured while Accepting Request",response.err)
        }
    } catch (error) {
        console.log("Error Occured in the HandleAccpetRequest",error)
    }
  }
  const HandleDeleteRequest = async (friend)=>{
    try {
        const details ={
            friendId: friend._id
        }
        const response = await RejectRequestCURD(details)
        if (response.success){
            await refreshUser()
        }
        else{
            throw new Error("Error Occured while Rejecting Request",response.err)
        }
    } catch (error) {
        console.log("Error Occured in the HandleDeleteRequest",error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-2 gap-6">

      {/* LEFT – SUGGESTIONS */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          People you may know
        </h2>

        {suggestions.length === 0 ? (
          <p className="text-gray-500">No suggestions</p>
        ) : (
          suggestions.map(friend => (
            <UserCard
              key={friend._id}
              friend={friend}
              type="suggestion"
            />
          ))
        )}
      </div>

      {/* RIGHT – REQUESTS */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          Friend Requests
        </h2>

        {requests.length === 0 ? (
          <p className="text-gray-500">No requests</p>
        ) : (
          requests.map(friend => (
            <UserCard
              key={friend._id}
              friend={friend}
              type="request"
              onAccept={HandleAcceptRequest}
              onReject={HandleDeleteRequest}
            />
          ))
        )}
      </div>

    </div>
  )
}

export default ManageFriendShip
