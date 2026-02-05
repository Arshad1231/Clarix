import { useState } from "react";
import Navbar from "../CommonPages/Components/Navbar";
import { userLoginCURD } from "../CURD/UserCURD";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContent";

export default function Login() {
  const Navigate = useNavigate();
  const { setUser, setisLoggedIn , setLoading,refreshUser} = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await userLoginCURD(form);
      console.log(response)
      if (response.user) {
        setUser(response.user);
        setisLoggedIn(true);
        setLoading(false)
        refreshUser()

        Navigate("/content/home");
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-body">
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 min-h-[650px]">

            {/* LEFT: TEXT */}
            <div className="hidden md:flex flex-col justify-center px-10 bg-gray-900 text-white">
              <h2 className="text-3xl font-heading-two mb-4">
                Welcome back to Clarix
              </h2>

              <p className="text-gray-300 mb-6">
                Continue asking questions, sharing knowledge, and learning
                together with a community that supports you.
              </p>

              <ul className="space-y-3 text-sm text-gray-300">
                <li>• Ask doubts without hesitation</li>
                <li>• Learn from peers and educators</li>
                <li>• Join real-time discussions</li>
                <li>• Grow through shared knowledge</li>
              </ul>
            </div>

            {/* CENTER: FORM */}
            <div className="flex items-center justify-center p-6 md:p-10">
              <form onSubmit={handleSubmit} className="w-full max-w-md">

                {/* ERROR MESSAGE */}
                {errorMsg && (
                  <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm font-body">
                    {errorMsg}
                  </div>
                )}

                <h1 className="text-2xl font-heading-two mb-2 text-center">
                  Login to Clarix
                </h1>

                <p className="text-gray-500 text-sm mb-6 text-center font-body">
                  Access your account and continue learning
                </p>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1 font-body">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 font-body"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1 font-body">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 font-body"
                    required
                  />
                </div>

                <p className="text-xs text-gray-500 mb-4 font-body">
                  Make sure your credentials are correct before logging in.
                </p>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition font-body"
                >
                  Login
                </button>

                <p className="text-sm text-center mt-6 text-gray-600 font-body">
                  Don’t have an account?{" "}
                  <span className="text-blue-600 cursor-pointer hover:underline">
                    Sign up
                  </span>
                </p>

                <p className="text-xs text-center text-gray-400 mt-4 font-body">
                  Learning works best when knowledge is shared.
                </p>
              </form>
            </div>

            {/* RIGHT: IMAGE */}
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
                alt="Books and learning"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
