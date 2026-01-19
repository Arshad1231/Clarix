import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContent";
import { userDetailsCURD } from "../CURD/UserCURD";

const ProfilePage = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!user) return;

    const getDetails = async () => {
      try {
        const res = await userDetailsCURD(user.id);

        if (res?.user && res?.profile) {
          setUserInfo(res.user);
          setProfile(res.profile);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    getDetails();
  }, [user]);

  if (!profile || !userInfo) {
    return <div className="p-6">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center gap-6 p-6 border-b">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-semibold text-gray-600">
            {userInfo.name.charAt(0)}
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {userInfo.name}
            </h1>
            <p className="text-gray-500">@{userInfo.username}</p>
            <p className="text-sm text-gray-600">{userInfo.email}</p>

            <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
              {userInfo.role.toUpperCase()}
            </span>
          </div>
        </div>

        {/* BODY */}
        <div className="grid md:grid-cols-2 gap-6 p-6">

          {/* ROLE-SPECIFIC INFO */}
          <div>
            <h2 className="text-lg font-semibold mb-3">
              {userInfo.role === "student" ? "Education" : "Professional Info"}
            </h2>

            {userInfo.role === "student" && (
              <>
                <p className="text-gray-700">
                  <strong>Institution:</strong> {profile.institution || "—"}
                </p>
                <p className="text-gray-700 mt-1">
                  <strong>Course:</strong> {profile.course || "—"}
                </p>
                <p className="text-gray-700 mt-1">
                  <strong>Year:</strong> {profile.year || "—"}
                </p>
              </>
            )}

            {userInfo.role === "teacher" && (
              <>
                <p className="text-gray-700">
                  <strong>Organization:</strong> {profile.organization || "—"}
                </p>
                <p className="text-gray-700 mt-1">
                  <strong>Designation:</strong> {profile.designation || "—"}
                </p>
                <p className="text-gray-700 mt-1">
                  <strong>Qualification:</strong> {profile.qualification || "—"}
                </p>
              </>
            )}
          </div>

          {/* STATS */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Activity Stats</h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-xl font-semibold">
                  {profile.questionsAsked}
                </p>
                <p className="text-sm text-gray-500">Questions</p>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="text-xl font-semibold">
                  {profile.answersGiven}
                </p>
                <p className="text-sm text-gray-500">Answers</p>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="text-xl font-semibold">
                  {profile.acceptedAnswers}
                </p>
                <p className="text-sm text-gray-500">Accepted</p>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="text-xl font-semibold">
                  {profile.reputation}
                </p>
                <p className="text-sm text-gray-500">Reputation</p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 bg-gray-50 text-sm text-gray-500 flex justify-between">
          <span>
            Joined: {new Date(profile.createdAt).toDateString()}
          </span>
          <span>
            Last updated: {new Date(profile.updatedAt).toDateString()}
          </span>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
