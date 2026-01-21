import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContent";
import { userDetailsCURD } from "../../CURD/UserCURD";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?._id) return;

    const getDetails = async () => {
      setLoading(true);
      try {
        const res = await userDetailsCURD(user._id);
        if (res?.user) {
          if (res?.user && res?.profile) {
            setDetails({
              ...res.user,
              ...res.profile,
            });
          }
          
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [user?._id]);

  useEffect(()=>{

  },[details])



  // ⏳ fetching details
  if (loading) {
    return (
      <div className="p-4 text-sm text-gray-500">
        Loading profile…
      </div>
    );
  }

  if (!details) {
    return (
      <div className="p-4 text-sm text-gray-500">
        Loading profile…
      </div>
    );
  }
  

  const roleColor =
    details.role === "teacher"
      ? "bg-purple-100 text-purple-700"
      : details.role === "student"
      ? "bg-blue-100 text-blue-700"
      : "bg-gray-100 text-gray-700";

  return (
    <div className="p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-72 min-w-64 w-full overflow-hidden">

        {/* HEADER */}
        <div className="h-20 bg-gradient-to-b from-red-500 to-white relative">
          <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center text-gray-600 text-sm">
            +
          </button>
        </div>

        {/* AVATAR */}
        <div className="relative flex justify-center -mt-10">
          <div className="w-20 h-20 rounded-full bg-white p-1 shadow">
            <div className="w-full h-full rounded-full bg-red-400 flex items-center justify-center text-xl font-semibold text-white">
              {details.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="px-4 pt-3 pb-4 text-center">
          <h2 className="font-heading-two text-lg text-gray-900">
            {details.name}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {details.email}
          </p>
          <span
            className={`inline-block mt-2 px-3 py-0.5 text-xs font-semibold rounded-full ${roleColor}`}
          >
            {details.role.toUpperCase()}
          </span>
        </div>

        {/* STATS */}
        <div className="border-t px-4 py-3 grid grid-cols-3 text-center text-xs">
          <div>
            <p className="font-semibold text-gray-900">
              {details.answersGiven?.length || 0}
            </p>
            <p className="text-gray-500">Helped</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {details.questionsAsked?.length || 0}
            </p>
            <p className="text-gray-500">Asked</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {details.friends?.length || 0}
            </p>
            <p className="text-gray-500">Friends</p>
          </div>
        </div>
      </div>

      <Link
        to="/content/profile"
        className="block mt-3 text-center text-sm font-medium text-blue-600 hover:text-blue-700 transition"
      >
        View full profile →
      </Link>
    </div>
  );
};

export default Profile;
