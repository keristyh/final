import { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import { supabase } from "./client";
import './App.css'
// import { formatDistanceToNow } from 'date-fns';


function App({ search }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [sortBy, setSortBy] = useState("time")

  useEffect(() => {
    const fetchRows = async () => {
      setLoading(true);
      let query = supabase.from("Posts").select("*");

      if (search) {
        query = query.ilike("title", `%${search}%`)
      }

      if (sortBy === "time") {
        query = query.order("created_at", { ascending: false })
      } else {
        query = query.order("upvotes", { ascending: false })
      }

      const { data, error } = await query;
      if (error) {
        console.error(error.message)
      }
      else setRows(data);
      setLoading(false);
    }
    fetchRows();
  }, [location.pathname, search, sortBy]);

  if (loading) {
    return (
      <div className="empty">
        <h1>loading posts…</h1>
      </div>
    )
  }

  if (!rows.length && !search) return (
    <div className='empty'>
      <h1>No posts yet</h1>
      <Link to="/create">Create a New Post!</Link>
    </div>
  )

  if (search && !rows.length) {
    return (
      <div className='empty'>
        <h1>No matching results for "{search}"</h1>
      </div>
    )
  }


  return (
    <div className='home-page'>
      <div className='sort-div'>
        <span className="sort-label">Order by:</span>
        {/* <select
          className="sort"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}>
          <option value="time">Newest</option>
          <option value="upvotes">Trending</option>
        </select> */}
        <button
          className={sortBy === 'time' ? 'sort-btn active' : 'sort-btn'}
          onClick={() => setSortBy('time')}
        >
          Newest
        </button>
        <button
          className={sortBy === 'upvotes' ? 'sort-btn active' : 'sort-btn'}
          onClick={() => setSortBy('upvotes')}
        >
          Trending
        </button>
      </div>

      <div className='post-list'>
        {rows.map((post) => (
          <Link to={`/post/${post.id}`}
            key={post.id}
            className="post-card">

            <h2 className='post-title'>{post.title}</h2>
            <p className='post-date'>
              {new Date(post.created_at).toLocaleDateString()}
            </p>
            <p className='post-upvotes'>{post.upvotes} ⬆</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default App
