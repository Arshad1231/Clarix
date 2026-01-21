import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContent";
import { GetFriendsCURD, GetRequestDetailsCURD } from "../../CURD/UserCURD";

const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow p-4 animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-200" />
      <div className="flex flex-col gap-2 w-full">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-2 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
  </div>
);

const Friends = () => {
  const { user } = useAuth();

  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    const loadData = async () => {
      try {
        const [friendsRes, requestRes] = await Promise.all([
          GetFriendsCURD(),
          GetRequestDetailsCURD(),
        ]);

        if (friendsRes?.success) {
          setFriends(friendsRes.friends || []);
        }

        if (requestRes?.success) {
          setRequests(requestRes.requests || []);
        }
      } catch (err) {
        console.error("Failed to load friends data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user?._id]);

  return (
    <div className="p-6 w-full lg:w-1/2 ml-auto">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-heading-two text-gray-900">
          Friends
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your friends, requests, and connections
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* FRIEND LIST */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">
            Your Friends{" "}
            <span className="text-red-500">
              {loading ? "…" : friends.length}
            </span>
          </h2>

          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : friends.length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-6">
              You don’t have any friends yet.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {friends.map((frnd) => (
                <div
                  key={frnd._id}
                  className="
                    group relative overflow-hidden
                    flex items-center gap-3
                    p-3 rounded-lg
                    bg-gradient-to-b from-red-300 to-white
                    transition-all duration-300
                    hover:shadow-xl hover:-translate-y-[1px]
                    cursor-pointer
                  "
                >
                  <div className="absolute inset-0 bg-red-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />

                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white p-[2px] shadow shrink-0">
                      <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600 overflow-hidden group-hover:bg-white group-hover:text-red-500 transition-colors">
                        {frnd.avatar ? (
                          <img
                            src={frnd.avatar}
                            alt={frnd.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          frnd.name?.charAt(0).toUpperCase()
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-white transition-colors">
                        {frnd.name}
                      </p>
                      <p className="text-xs capitalize group-hover:text-white/80 transition-colors">
                        {frnd.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FRIEND REQUESTS */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">
            Friend Requests{" "}
            <span className="text-red-500">
              {loading ? "…" : requests.length}
            </span>
          </h2>

          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : requests.length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-6">
              No incoming requests.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {requests.map((req) => (
                <div
                  key={req._id}
                  className="
                    group relative overflow-hidden
                    flex items-center gap-3
                    p-3 rounded-lg
                    bg-gradient-to-b from-red-300 to-white
                    transition-all duration-300
                    hover:shadow-xl hover:-translate-y-[1px]
                    cursor-pointer
                  "
                >
                  <div className="absolute inset-0 bg-red-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />

                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white p-[2px] shadow shrink-0">
                      <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center font-semibold text-gray-700 group-hover:bg-white group-hover:text-red-500 transition-colors">
                        {req.name?.charAt(0).toUpperCase()}
                      </div>
                    </div>

                    <div className="flex flex-col min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-white transition-colors">
                        {req.name}
                      </p>
                      <p className="text-xs capitalize group-hover:text-white/80 transition-colors">
                        {req.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
  