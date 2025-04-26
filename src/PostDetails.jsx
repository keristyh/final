import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "./client";
import "./PostDetails.css";

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newAuthor, setNewAuthor] = useState("");
    const [newContent, setNewContent] = useState("");

    useEffect(() => {
        const loadPost = async () => {
            const { data, error } = await supabase
                .from("Posts")
                .select("*")
                .eq("id", id)
                .single()

            if (error) {
                console.error("Error:", error.message)
            }
            else setPost(data)
        }
        loadPost();
    }, [id]);

    useEffect(() => {
        const loadComments = async () => {
            const { data, error } = await supabase
                .from("Comments")
                .select("*")
                .eq("post_id", id)
                .order("created_at", { ascending: true })
            if (error) {
                console.error("Error:", error.message)
            }
            else setComments(data);
        }
        loadComments();
    }, [id])

    const updateCount = async () => {
        const count = post.upvotes + 1;
        const { data: updated, error } = await supabase
            .from("Posts")
            .update({ upvotes: count + 1 })
            .eq("id", id)
            .select()
            .single()

        if (error) {
            console.error("Error:", error.message)
        }
        else setPost(updated);
    }

    const handleComment = async (e) => {
        e.preventDefault();
        const postId = Number(id);
        const { data, error } = await supabase
            .from("Comments")
            .insert({
                post_id: postId,
                author: newAuthor,
                content: newContent
            })
            .select();

        if (error) {
            console.error("Error:", error.message)
        }
        else {
            setComments((c) => [...c, data[0]])
            setNewAuthor("");
            setNewContent("");
        }
    }



    if (!post) return <p>Loading...</p>;

    return (
        <div className="post-details-page">
            <div className="post-card-detail">
                <h1>{post.title}</h1>
                <h2>created by: {post.author}</h2>
                {post.content && <p className="content">{post.content}</p>}
                {post.image_url && <img src={post.image_url} alt={post.title} />}
                <div className="post-actions">
                    <Link to={`/edit/${post.id}`} className="submit-btn">
                        Edit this Post
                    </Link>
                    <button onClick={updateCount} className="upvote-btn">
                        ⬆ {post.upvotes}
                    </button>
                </div>
            </div>

            <form onSubmit={handleComment} className="comment-form">
                <h4>Comments</h4>
                <input
                    type="text"
                    placeholder="Your name"
                    value={newAuthor}
                    onChange={e => setNewAuthor(e.target.value)}
                    required
                />
                <textarea
                    rows={3}
                    placeholder="Leave a comment"
                    value={newContent}
                    onChange={e => setNewContent(e.target.value)}
                    required
                />
                <button type="submit">Post Comment</button>
            </form>

            {comments.length === 0 ? (
                <p className="no-comments">Be the first to comment!</p>
            ) : (
                comments.map(c => (
                    <div key={c.id} className="comment">
                        <div className="meta">
                            <strong>{c.author}</strong> - {" "}
                            {new Date(c.created_at).toLocaleString()}
                        </div>
                        <div className="body">{c.content}</div>
                    </div>
                ))
            )}
        </div>
    )
}

export default PostDetails;