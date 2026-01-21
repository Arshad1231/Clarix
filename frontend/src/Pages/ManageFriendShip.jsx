import React, { useEffect, useState } from "react";
import {
  GetAllUsersCURD,
  AcceptRequestCURD,
  RejectRequestCURD,
} from "../CURD/UserCURD";
import UserCard from "./Components/UserCard.jsx";
import { useAuth } from "../Context/AuthContent.jsx";

const ManageFriendShip = () => {
  const { user, refreshUser } = useAuth();

  const [suggestions, setSuggestions] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const GetUsers = async () => {
      const res = await GetAllUsersCURD();
      if (!res?.success) return;

      const sugg = [];
      const req = [];

      res.value.forEach((friend) => {
        if (user.friendRequests.includes(friend._id)) {
          req.push(friend);
        } else {
          sugg.push(friend);
        }
      });

      setSuggestions(sugg);
      setRequests(req);
    };

    if (user?.friendRequests) {
      GetUsers();
    }
  }, [user.friendRequests, user.friends, user.sentRequests]);

  const HandleAcceptRequest = async (friend) => {
    try {
      const response = await AcceptRequestCURD({
        friendId: friend._id,
      });
      if (response.success) {
        await refreshUser();
      }
    } catch (error) {
      console.error("Accept request error:", error);
    }
  };

  const HandleDeleteRequest = async (friend) => {
    try {
      const response = await RejectRequestCURD({
        friendId: friend._id,
      });
      if (response.success) {
        await refreshUser();
      }
    } catch (error) {
      console.error("Reject request error:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 font-body">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-heading-two text-gray-900 border-l-4 border-red-500 pl-3">
          Manage Friendships
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Connect with people and manage incoming requests
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SUGGESTIONS */}
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              People you may know
            </h2>
            <span className="text-sm font-semibold text-red-500">
              {suggestions.length}
            </span>
          </div>

          {suggestions.length === 0 ? (
            <EmptyState text="No new suggestions right now." />
          ) : (
            <div className="flex flex-col gap-3">
              {suggestions.map((friend) => (
                <UserCard
                  key={friend._id}
                  friend={friend}
                  type="suggestion"
                />
              ))}
            </div>
          )}
        </div>

        {/* REQUESTS */}
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Friend Requests
            </h2>
            <span className="text-sm font-semibold text-red-500">
              {requests.length}
            </span>
          </div>

          {requests.length === 0 ? (
            <EmptyState text="You don’t have any requests." />
          ) : (
            <div className="flex flex-col gap-3">
              {requests.map((friend) => (
                <UserCard
                  key={friend._id}
                  friend={friend}
                  type="request"
                  onAccept={HandleAcceptRequest}
                  onReject={HandleDeleteRequest}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------- EMPTY STATE ---------- */
const EmptyState = ({ text }) => (
  <div className="text-center py-8 text-sm text-gray-500 border border-dashed border-gray-300 rounded-lg">
    {text}
  </div>
);

export default ManageFriendShip;
