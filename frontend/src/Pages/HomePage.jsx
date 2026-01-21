import React from "react";
import { useAuth } from "../Context/AuthContent";
import Profile from "./Components/Profile";
import Posts from "./Components/Posts";
import Friends from "./Components/Friends";

const HomePage = () => {
  const { Loading, user } = useAuth();

  // ⏳ Wait until auth check finishes
  if (Loading) {
    return (
      <div className="p-6 text-sm text-gray-500">
        Loading dashboard…
      </div>
    );
  }

  // 🚫 Not logged in
  if (!user) return null;

  return (
    <div className="flex flex-row gap-3 justify-between mt-10">
      <Profile key={user?._id} />
      <Posts />
      <Friends />
    </div>
  );
};

export default HomePage;
