import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "./client";
import "./Edit.css";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {

        const loadPost = async () => {
            const { data, error } = await supabase
                .from("Posts")
                .select("*")
                .eq("id", id)
                .single()

            if (error) {
                console.error("Error:", error.message)
                return;
            }
            setPost(data);
        }
        loadPost();
    }, [id])



    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prev) => ({ ...prev, [name]: value }))
    }

    const save = async (e) => {
        e.preventDefault();
        const { error } = await supabase
            .from("Posts")
            .update({
                title: post.title,
                author: post.author,
                content: post.content,
                image_url: post.image_url
            }).eq("id", id)

        if (error) {
            console.error("Error:", error.message)
        } else {
            navigate("/")
        }
    }

    const remove = async (e) => {
        await supabase
            .from("Posts")
            .delete().eq("id", id)

        navigate("/")
    }

    if (!post) {
        return <p>Loading...</p>
    }


    return (
        <div className="post-details-page">
            <div className="post-card-detail edit-card-detail">
                <h1>Update Your Post</h1>

                <form className="edit-form" onSubmit={save}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={post.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input
                            id="author"
                            name="author"
                            type="text"
                            value={post.author}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Description</label>
                        <textarea
                            id="content"
                            name="content"
                            rows="5"
                            value={post.content}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="button-group">
                        <button type="submit" className="submit-btn">
                            Update Post
                        </button>
                        <button type="button" className="delete-btn" onClick={remove}>
                            Delete Post
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Edit;