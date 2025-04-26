import React from "react";
import { useState } from "react";
import { supabase } from './client'
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";


const CreatePost = () => {
    const [form, setForm] = useState({
        title: "",
        author: "",
        content: "",
        image_url: ""
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase
            .from("Posts")
            .insert(form);
        if (error) {
            console.error("Error:", error.message);
        } else {
            navigate("/");
        }
    }

    return (
        <div className="post-details-page">
            <div className="post-card-detail create-card-detail">
                <h1>Create a New Post</h1>
                <form className="create-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter title"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input
                            id="author"
                            name="author"
                            type="text"
                            value={form.author}
                            onChange={handleChange}
                            placeholder="Your name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Description</label>
                        <textarea
                            id="content"
                            name="content"
                            rows={5}
                            value={form.content}
                            onChange={handleChange}
                            placeholder="Tell us about your drink…"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image_url">Image URL</label>
                        <input
                            id="image_url"
                            name="image_url"
                            type="url"
                            value={form.image_url}
                            onChange={handleChange}
                            placeholder="https://example.com/image.png"
                        />
                    </div>
                    <div className="post-actions">
                        <button type="submit" className="submit-btn">
                            Submit Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost;
