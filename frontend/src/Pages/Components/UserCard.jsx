import { useState } from "react"
import {  SendRequestCURD } from "../../CURD/UserCURD"
import { useAuth } from "../../Context/AuthContent"

const UserCard = ({ friend, type,onAccept,onReject }) => {
  const { user,setUser} = useAuth()

  // 🔹 derive states from logged-in user
  const isFriend = user?.friends?.includes(friend._id)
  const isSentAlready = user?.sentRequests?.includes(friend._id)

  const [sent, setSent] = useState(isSentAlready)
  const [loading, setLoading] = useState(false)

  const SendRequest = async () => {
    try {
      setLoading(true)

      const response = await SendRequestCURD({
        userid: friend._id,
      })

      if (response?.success) {
        setSent(true)
      }
    } catch (error) {
      console.log("Error occurred in SendRequest", error)
    } finally {
      setLoading(false)
    }
  }
 
  return (
    <div className="flex justify-between items-center border p-4 rounded-lg mb-3 bg-white shadow-sm">

      {/* Friend Info */}
      <div>
        <p className="font-semibold">{friend.name}</p>
        <p className="text-sm text-gray-500">{friend.role}</p>
      </div>

      {/* SUGGESTION MODE */}
      {type === "suggestion" && (
        <>
          {/* FRIEND */}
          {isFriend ? (
            <button
              disabled
              className="px-4 py-1 rounded bg-yellow-500 text-white cursor-not-allowed"
            >
              Friends
            </button>
          ) : (
            /* SENT / ADD */
            <button
              onClick={SendRequest}
              disabled={sent || loading}
              className={`
                px-4 py-1 rounded text-white transition
                ${sent
                  ? "bg-green-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"}
              `}
            >
              {sent ? "Sent" : loading ? "Sending..." : "Add"}
            </button>
          )}
        </>
      )}

      {/* REQUEST MODE */}
      {type === "request" && (
        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-3 py-1 rounded"
            onClick={()=>{onAccept(friend)}}
          >
            Accept
          </button>
          <button className="bg-red-600 text-white px-3 py-1 rounded"
            onClick={()=>{onReject(friend)}}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  )
}

export default UserCard
