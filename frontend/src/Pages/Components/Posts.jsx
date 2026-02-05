import React, { useEffect, useState, useCallback, useRef } from "react";
import { GetPostsForScrollCURD } from "../../CURD/PostCURD";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const didInitialLoad = useRef(false);

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const data = await GetPostsForScrollCURD(posts.length);

      if (!data || !Array.isArray(data.posts) || data.posts.length === 0) {
        setHasMore(false);
        return;
      }

      setPosts((prev) => {
        const map = new Map(prev.map((p) => [p._id, p]));
        data.posts.forEach((p) => map.set(p._id, p));
        return Array.from(map.values());
      });
    } catch (err) {
      console.error("Posts fetch failed:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [posts.length, loading, hasMore]);

  // Initial load (StrictMode-safe)
  useEffect(() => {
    if (didInitialLoad.current) return;
    didInitialLoad.current = true;
    loadMorePosts();
  }, [loadMorePosts]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 150
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMorePosts]);

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-heading-two text-gray-900">
          <span className="text-red-600">Posts</span>
        </h1>
        <p className="text-sm text-red-400">
          See what people are sharing
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {!loading && posts.length === 0 && (
          <div className="text-sm text-red-500 text-center py-6">
            No posts yet.
          </div>
        )}

        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-xl shadow p-4
                       border border-red-100
                       hover:border-red-300
                       hover:shadow-red-100/50
                       transition"
          >
            <h2 className="font-semibold text-gray-900">
              <span className="border-l-4 border-red-500 pl-2">
                {post.title}
              </span>
            </h2>

            <p className="text-sm text-gray-600 mt-2">
              {post.description}
            </p>

            <Link
              to={`/content/question/${post._id}`}
              className="inline-block mt-4 text-sm font-medium
                         text-red-600 hover:text-white
                         border border-red-500
                         px-3 py-1.5 rounded-lg
                         hover:bg-red-500
                         transition"
            >
              View Post
            </Link>
          </div>
        ))}

        {loading && (
          <p className="text-center text-sm text-red-400">
            Loading posts…
          </p>
        )}

        {!hasMore && posts.length > 0 && (
          <p className="text-center text-sm text-red-400 py-4">
            You’re all caught up 🎉
          </p>
        )}
      </div>
    </div>
  );
};

export default Posts;
