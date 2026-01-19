import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContent";
import { userLogOutCURD } from "../../CURD/UserCURD";

export default function Navbar() {
    const navigate = useNavigate()

    const {setUser,isLoggedIn,setisLoggedIn} = useAuth()
    const HandleLogout=async ()=>{
        await userLogOutCURD()
        setUser(null)
        setisLoggedIn(false)
        navigate("/login");         
    } 
  return (
    <nav className="w-full h-16 bg-white border-b flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/content/home" className="text-xl font-semibold text-black">
          SmartLearning
        </Link>

        {/* Ask */}
        <button
          className="text-sm font-medium text-red-600 hover:text-red-700"
          
        >
          <Link to="/content/ask">Ask</Link>
        </button>
        {/* Question History */}
        <button
          className="text-sm font-medium text-red-600 hover:text-red-700"
          
        >
          <Link to="/content/history">Questions</Link>
        </button>
        {/* FriendShip*/}
        <button
          className="text-sm font-medium text-red-600 hover:text-red-700"
          
        >
          <Link to="/content/friends">Friends</Link>
        </button>
        {/* LOGOUT */}
        <button
          className="text-sm font-medium text-red-600 hover:text-red-700"
        >
          <Link to="/content/chat">Chats</Link>
        </button>
        {/* LOGOUT */}
        <button
          className="text-sm font-medium text-red-600 hover:text-red-700"
          onClick={HandleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
