import React, { useEffect, useState } from 'react'
import { GetPostsForScrollCURD } from '../../CURD/PostCURD'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMorePosts = async () => {
    if (loading || !hasMore) return
  
    setLoading(true)
  
    const data = await GetPostsForScrollCURD(posts.length)
  
    if (!data || data.posts.length === 0) {
      setHasMore(false)
    } else {
      setPosts(prev => [...prev, ...data.posts])
    }
  
    setLoading(false)
  }
  
  useEffect(() => {
      loadMorePosts()
    }, [])
    useEffect(() => {
      const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100
        ) {
          loadMorePosts()
        }
      }
    
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [posts, loading, hasMore])
  
  return (
    <div>
      {posts.map(post => (
        <div
          key={post._id}
          className="border p-4 mb-3 rounded bg-white min-h-96"
        >
          <h2 className="font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-600">
            {post.description}
          </p>
        </div>
      ))} 

      {loading && (
        <p className="text-center text-gray-500">
          Loading more...
        </p>
      )}

      {!hasMore && (
        <p className="text-center text-gray-400">
          No more posts
        </p>
      )}

    </div>
  )
}

export default Posts