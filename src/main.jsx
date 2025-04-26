import { StrictMode } from 'react'
import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CreatePost from './CreatePost.jsx'
import Layout from './routes/Layout.jsx'
import About from './routes/About'
import PostDetails from './PostDetails'
import Edit from './Edit.jsx'

const Root = () => {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout setSearchTerm={setSearch} />}>
          <Route index element={<App search={search} />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/about" element={<About />} />
          <Route path="post/:id" element={<PostDetails />} />
          <Route path="edit/:id" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
