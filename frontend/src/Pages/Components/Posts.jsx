import React, { useEffect, useState, useCallback, useRef } from "react";
import { GetPostsForScrollCURD } from "../../CURD/PostCURD";

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

      if (!data || !Array.isArray(data.posts)) {
        setHasMore(false);
        return;
      }

      if (data.posts.length === 0) {
        setHasMore(false);
        return;
      }

      setPosts((prev) => {
        const map = new Map(prev.map(p => [p._id, p]));
        data.posts.forEach(p => map.set(p._id, p));
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
      <div className="mb-4">
        <h1 className="text-xl font-heading-two text-gray-900">
          Posts
        </h1>
        <p className="text-sm text-gray-500">
          See what people are sharing
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {!loading && posts.length === 0 && (
          <div className="text-sm text-gray-500 text-center py-6">
            No posts yet.
          </div>
        )}

        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-xl shadow p-4"
          >
            <h2 className="font-semibold text-gray-900">
              {post.title}
            </h2>
            <p className="text-sm text-gray-600">
              {post.description}
            </p>
          </div>
        ))}

        {loading && (
          <p className="text-center text-sm text-gray-400">
            Loading posts…
          </p>
        )}

        {!hasMore && posts.length > 0 && (
          <p className="text-center text-sm text-gray-400 py-4">
            You’re all caught up 🎉
          </p>
        )}
      </div>
    </div>
  );
};

export default Posts;
