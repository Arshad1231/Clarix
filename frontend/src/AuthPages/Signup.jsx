import { useState } from "react";
import { userRegisterCURD } from "../CURD/UserCURD";
import Navbar from "../CommonPages/Components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContent";

export default function Signup() {
  const {setUser, setisLoggedIn} = useAuth()
  const Navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    institution: "",
    course: "",
    organization: "",
    specializations: "",
    qualification: "",
    avatar: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({ ...form, avatar: file });
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
  
    const formData = new FormData();
  
    Object.entries({
      name: form.name,
      username: form.username,
      email: form.email,
      password: form.password,
      role,
    }).forEach(([key, value]) => formData.append(key, value));
  
    if (form.avatar) {
      formData.append("avatar", form.avatar);
    }
  
    if (role === "student") {
      formData.append("institution", form.institution);
      formData.append("course", form.course);
    }
  
    if (role === "teacher") {
      formData.append("organization", form.organization);
      formData.append("qualification", form.qualification);
      formData.append(
        "specializations",
        JSON.stringify(
          form.specializations.split(",").map((s) => s.trim())
        )
      );
    }
  
    try {
      const response = await userRegisterCURD(formData);
  
      if (response?.userId) {
        // ✅ Registration successful → go to login
        Navigate("/login");
      } else {
        setErrorMsg(response?.message || "Registration failed");
      }
    } catch (err) {
      setErrorMsg(err.message || "Server error. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full mt-10 max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-lg overflow-hidden">
          
          {/* LEFT IMAGE */}
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Signup"
              className="w-full h-full object-cover"
            />
          </div>

          {/* FORM */}
          <div className="flex items-center justify-center p-6 md:p-10">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md"
              encType="multipart/form-data"
            >
              {/* ERROR MESSAGE */}
              {errorMsg && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                  {errorMsg}
                </div>
              )}

              <h1 className="text-2xl font-semibold mb-6 text-center">
                Create Account
              </h1>

              {/* AVATAR */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-2">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      Avatar
                    </div>
                  )}
                </div>

                <label className="text-sm cursor-pointer text-blue-600">
                  Upload Avatar
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>

              {/* ROLE */}
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>

              {/* COMMON */}
              {["name", "username", "email", "password"].map((field) => (
                <input
                  key={field}
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  placeholder={field.toUpperCase()}
                  className="w-full border rounded px-3 py-2 mb-4"
                  onChange={handleChange}
                  required
                />
              ))}

              {/* STUDENT */}
              {role === "student" && (
                <>
                  <input
                    name="institution"
                    placeholder="Institution"
                    className="w-full border rounded px-3 py-2 mb-4"
                    onChange={handleChange}
                  />
                  <input
                    name="course"
                    placeholder="Course"
                    className="w-full border rounded px-3 py-2 mb-4"
                    onChange={handleChange}
                  />
                </>
              )}

              {/* TEACHER */}
              {role === "teacher" && (
                <>
                  <input
                    name="organization"
                    placeholder="Organization"
                    className="w-full border rounded px-3 py-2 mb-4"
                    onChange={handleChange}
                  />
                  <input
                    name="qualification"
                    placeholder="Qualification"
                    className="w-full border rounded px-3 py-2 mb-4"
                    onChange={handleChange}
                  />
                  <input
                    name="specializations"
                    placeholder="Specializations (comma separated)"
                    className="w-full border rounded px-3 py-2 mb-4"
                    onChange={handleChange}
                  />
                </>
              )}

              <button className="w-full bg-black text-white py-2 rounded">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
