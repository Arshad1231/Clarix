import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContent";
import { userDetailsCURD } from "../../CURD/UserCURD";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!user) return;

    const getDetails = async () => {
      const res = await userDetailsCURD(user._id);
      if (res?.user && res?.profile) {
        setDetails({
          user: res.user,
          profile: res.profile,
        });
      }
    };

    getDetails();
  }, [user]);

  if (!details) {
    return <div className="p-6">Loading profile...</div>;
  }

  const { user: userInfo,profile } = details;

  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-md p-4 w-72 flex gap-4 items-start">
  
        {/* PROFILE PICTURE */}
        <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-600 shrink-0">
          {userInfo.name.charAt(0)}
        </div>
  
        {/* USER INFO */}
        <div className="flex flex-col">
          <h2 className="text-base font-semibold text-gray-900">
            {userInfo.name}
          </h2>
  
          <p className="text-sm text-gray-500">
            @{userInfo.username}
          </p>
  
          <p className="text-sm text-gray-600 mt-1">
            {userInfo.email}
          </p>
  
          <span className="mt-2 inline-block w-fit px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
            {userInfo.role.toUpperCase()}
          </span>
        </div>


  
      </div>
      <button>
        <Link to="/content/profile" >
            Profile
        </Link>
      </button>
    </div>
  );
  
};

export default Profile;
