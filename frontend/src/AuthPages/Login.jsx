import { useState } from "react";
import Navbar from "../CommonPages/Components/Navbar";
import { userLoginCURD } from "../CURD/UserCURD";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContent";

export default function Login() {
  const Navigate = useNavigate()
  const { setUser,setisLoggedIn} = useAuth()
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState(""); // ✅ NEW

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // reset previous error

    try {
      const response = await userLoginCURD(form);     
      if (response.user){
        setisLoggedIn(true);
        setUser(response.user);
        Navigate("/content/home")
      }
      else{
        setErrorMsg(response.message); 
      }
    } catch (error) {
      setErrorMsg(error.message); // ✅ show backend error
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-lg min-h-[650px] overflow-hidden">
          
          {/* LEFT IMAGE */}
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
              alt="Books and learning"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT FORM */}
          <div className="flex items-center justify-center p-6 md:p-10">
            <form onSubmit={handleSubmit} className="w-full max-w-md">

              {/* 🔴 ERROR MESSAGE ON TOP */}
              {errorMsg && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                  {errorMsg}
                </div>
              )}

              <h1 className="text-2xl font-semibold mb-2 text-center">
                Welcome Back
              </h1>
              <p className="text-gray-500 text-sm mb-6 text-center">
                Login to continue learning
              </p>

              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
              >
                Login
              </button>

              <p className="text-sm text-center mt-4 text-gray-600">
                Don’t have an account?{" "}
                <span className="text-blue-600 cursor-pointer hover:underline">
                  Sign up
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
