import { useState } from "react";
import { userRegisterCURD } from "../CURD/UserCURD";
import Navbar from "../CommonPages/Components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContent";

const Signup=()=> {
  const {setUser, setisLoggedIn} = useAuth()
  const Navigate = useNavigate();


  const [role, setRole] = useState("student");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState("")
  const [Errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    institution: "",
    course: "",
    organization: "",
    qualification: "",
    specializations: "",
    avatar: ""
  })

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

  const HandleValidations = (form) => {
    const newErrors = {};
  
    // NAME
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
      newErrors.name = "Name can only contain letters";
    }
  
    // USERNAME
    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    } else if (form.username.length < 4) {
      newErrors.username = "Username must be at least 4 characters";
    }
  
    // EMAIL
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }
  
    // PASSWORD
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
  
    // STUDENT
    if (role === "student") {
      if (!form.institution.trim()) {
        newErrors.institution = "Institution is required";
      }
      if (!form.course.trim()) {
        newErrors.course = "Course is required";
      }
    }
  
    // TEACHER
    if (role === "teacher") {
      if (!form.organization.trim()) {
        newErrors.organization = "Organization is required";
      }
      if (!form.qualification.trim()) {
        newErrors.qualification = "Qualification is required";
      }
      if (!form.specializations.trim()) {
        newErrors.specializations =
          "At least one specialization is required";
      }
    }
  
    setErrors(newErrors);
  
    // ✅ return true if NO errors
    return Object.keys(newErrors).length === 0;
  };
  

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

    const isValid = HandleValidations(form);
    if (!isValid) return;
    
  
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
  
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4">
        <div className="w-full mt-10 max-w-6xl grid grid-cols-1 md:grid-cols-3 rounded-2xl overflow-hidden shadow-2xl">
  
          {/* ================= LEFT TEXT PANEL ================= */}
          <div className="p-10 bg-[#0b1323] text-white flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-heading-two leading-tight mb-6">
                Welcome back to <br />
                <span className="font-semibold">Clarix</span>
              </h1>
  
              <p className="font-body text-gray-300 mb-8 leading-relaxed text-sm">
                Clarix is a collaborative learning platform where curiosity,
                discussion, and shared knowledge help you grow faster together.
              </p>
  
              <ul className="space-y-3 font-body text-gray-300 text-sm">
                <li>• Ask doubts without hesitation</li>
                <li>• Learn from peers and educators</li>
                <li>• Join real-time discussions</li>
                <li>• Grow through shared knowledge</li>
              </ul>
            </div>
  
            <div className="mt-10 pt-6 border-t border-gray-700">
              <p className="font-body text-xs text-gray-400">
                Knowledge compounds when shared consistently.
              </p>
            </div>
  
            {/* VALIDATION ERRORS */}
            {Object.keys(Errors).length > 0 && (
              <div className="mt-8 bg-[#111827] border border-red-400 text-red-300 px-4 py-3 rounded text-sm font-body">
                <p className="font-semibold mb-1">
                  Please fix the following errors:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {Object.values(Errors).map(
                    (err, index) =>
                      err && <li key={index}>{err}</li>
                  )}
                </ul>
              </div>
            )}
          </div>
  
          {/* ================= CENTER FORM ================= */}
          <div className="flex items-center justify-center bg-white px-10 py-14">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md"
              encType="multipart/form-data"
            >
              {/* SERVER ERROR */}
              {errorMsg && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm font-body">
                  {errorMsg}
                </div>
              )}

              <h2 className="text-3xl font-heading-two text-center mb-2 text-[#111]">
                Create Account
              </h2>

              <p className="text-center font-body text-gray-500 mb-8 text-sm">
                Access your account and continue learning with Clarix
              </p>

              {/* NAME */}
              <div className="mb-4">
                <input
                  name="name"
                  placeholder="Full name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-body focus:outline-none focus:ring-1 focus:ring-black"
                  onChange={handleChange}
                />
                <p className="text-[11px] text-gray-400 font-body mt-1">
                  Required · Letters only
                </p>
              </div>

              {/* USERNAME */}
              <div className="mb-4">
                <input
                  name="username"
                  placeholder="Username"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-body focus:outline-none focus:ring-1 focus:ring-black"
                  onChange={handleChange}
                />
                <p className="text-[11px] text-gray-400 font-body mt-1">
                  Required · Minimum 4 characters · Lowercase
                </p>
              </div>

              {/* EMAIL */}
              <div className="mb-4">
                <input
                  name="email"
                  placeholder="Email address"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-body focus:outline-none focus:ring-1 focus:ring-black"
                  onChange={handleChange}
                />
                <p className="text-[11px] text-gray-400 font-body mt-1">
                  Required · Must be a valid email
                </p>
              </div>

              {/* PASSWORD */}
              <div className="mb-6">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-body focus:outline-none focus:ring-1 focus:ring-black"
                  onChange={handleChange}
                />
                <p className="text-[11px] text-gray-400 font-body mt-1">
                  Required · Minimum 8 characters
                </p>
              </div>

              {/* ROLE */}
              <div className="mb-6">
                <label className="block text-xs font-body text-gray-600 mb-1">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-body focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
                <p className="text-[11px] text-gray-400 font-body mt-1">
                  Required · Choose how you’ll use Clarix
                </p>
              </div>

              {/* STUDENT */}
              {role === "student" && (
                <>
                  <div className="mb-4">
                    <input
                      name="institution"
                      placeholder="Institution"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-body"
                      onChange={handleChange}
                    />
                    <p className="text-[11px] text-gray-400 font-body mt-1">
                      Required for students
                    </p>
                  </div>

                  <div className="mb-4">
                    <input
                      name="course"
                      placeholder="Course"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-body"
                      onChange={handleChange}
                    />
                    <p className="text-[11px] text-gray-400 font-body mt-1">
                      Required for students
                    </p>
                  </div>
                </>
              )}

              {/* TEACHER */}
              {role === "teacher" && (
                <>
                  <div className="mb-4">
                    <input
                      name="organization"
                      placeholder="Organization"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-body"
                      onChange={handleChange}
                    />
                    <p className="text-[11px] text-gray-400 font-body mt-1">
                      Required for teachers
                    </p>
                  </div>

                  <div className="mb-4">
                    <input
                      name="qualification"
                      placeholder="Qualification"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-body"
                      onChange={handleChange}
                    />
                    <p className="text-[11px] text-gray-400 font-body mt-1">
                      Required · e.g. MSc, PhD, B.Tech
                    </p>
                  </div>

                  <div className="mb-6">
                    <input
                      name="specializations"
                      placeholder="Specializations (comma separated)"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-body"
                      onChange={handleChange}
                    />
                    <p className="text-[11px] text-gray-400 font-body mt-1">
                      Required · At least one specialization
                    </p>
                  </div>
                </>
              )}

              <button className="w-full bg-black text-white py-2.5 rounded-md font-body font-medium hover:bg-[#111] transition">
                Sign Up
              </button>

              <p className="text-center font-body text-sm text-gray-600 mt-6">
                Already have an account?{" "}
                <span className="text-blue-600 cursor-pointer">Log in</span>
              </p>
            </form>
          </div>

  
          {/* ================= RIGHT IMAGE ================= */}
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
              alt="Books"
              className="w-full h-full object-cover"
            />
          </div>
  
        </div>
      </div>
    </>
  );
  
  
  
}


export default Signup