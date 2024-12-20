import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import noImg from "../../img/empty_pot.jpg";
import "../../styles/blog.css";


const PlantBlog = () => {
    const { store, actions } = useContext(Context);
    const [showNewPost, setShowNewPost] = useState(false);
    const [newPost, setNewPost] = useState({
        title: "",
        content: "",
        image_url: ""
    });
const navigate = useNavigate()

    useEffect(() => {
        actions.fetchBlogs();
    }, []);

    const handleDelete = async (blogId) => {
        if (!window.confirm("Are you sure you want to delete this post?")) {
            return;
        }
        const success = await actions.deleteBlog(blogId);
        if (!success) {
            alert("Failed to delete post");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.createBlogPost(newPost);
        if (success) {
            setNewPost({ title: "", content: "", image_url: "" });
        }
        navigate("/dashboard")
    };


    return (
        <div className="container mt-5 pb-5 blog-div">
            {/* Create Post Section */}
            {localStorage.getItem("jwt-token") && (
                <>
                    <div className="d-flex mb-3">
                        <button
                            className="btn btn-dark rounded-pill ms-auto"
                            onClick={() => setShowNewPost(!showNewPost)}
                        >
                            {!showNewPost ? "Create a New Blog Post" : "Hide the Create New Post"}
                            <i className="fas fa-circle-plus ms-2" />
                        </button>
                    </div>
                    {showNewPost && (
                        <div className="card mb-5">
                            <div className="card-body">
                                <h2 className="card-title mb-4">Create New Blog Post</h2>
                                {store.blogError && (
                                    <div className="alert alert-danger" role="alert">
                                        {store.blogError}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            value={newPost.title}
                                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="content" className="form-label">Content</label>
                                        <textarea
                                            className="form-control"
                                            id="content"
                                            rows="5"
                                            value={newPost.content}
                                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="image_url" className="form-label">Image URL (optional)</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            id="image_url"
                                            value={newPost.image_url}
                                            onChange={(e) => setNewPost({ ...newPost, image_url: e.target.value })}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-success">
                                        Create Post
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                </>
            )}

            <div className="card">
                <div className="card-body">
                    <h2 className="card-title mb-4">Blog Posts</h2>
                    {store.blogs.length === 0 ? (
                        <p className="text-muted">No blog posts yet.</p>
                    ) : (
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            {store.blogs.map((blog) => (
                                <div key={blog.id} className="col">
                                    <div className="card h-100">
                                        {parseInt(store.userId) === blog.author_id && (
                                            <button
                                                onClick={() => handleDelete(blog.id)}
                                                className="delete-btn"
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        )}
                                        <img
                                            src={blog.image_url || noImg}
                                            className="card-img-top"
                                            alt={blog.title}
                                            style={{
                                                height: "200px",
                                                width: "100%",
                                                objectFit: "cover",
                                                objectPosition: "center"
                                            }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{blog.title}</h5>
                                            <p className="card-text text-muted">
                                                By {blog.author} on {new Date(blog.created_at).toLocaleDateString()}
                                            </p>
                                            <p className="card-text">
                                                {blog.content.length > 150
                                                    ? `${blog.content.substring(0, 150)}...`
                                                    : blog.content}
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <div className="btn-group">
                                                    <button
                                                        onClick={() => actions.handleBlogLikeToggle(blog.id, true)}
                                                        className={`btn btn-outline-success btn-sm me-2 ${blog.userLikeStatus === 'like' ? 'active' : ''
                                                            }`}
                                                        disabled={!store.userId || parseInt(store.userId) === blog.author_id}
                                                    >
                                                        <i className="fas fa-thumbs-up me-1"></i>
                                                        <span>{blog.likes_count || 0}</span>
                                                    </button>
                                                    <button
                                                        onClick={() => actions.handleBlogLikeToggle(blog.id, false)}
                                                        className={`btn btn-outline-danger btn-sm ${blog.userLikeStatus === 'dislike' ? 'active' : ''
                                                            }`}
                                                        disabled={!store.userId || parseInt(store.userId) === blog.author_id}
                                                    >
                                                        <i className="fas fa-thumbs-down me-1"></i>
                                                        <span>{blog.dislikes_count || 0}</span>
                                                    </button>
                                                </div>
                                                <Link to={`/blog/${blog.id}`} className="btn btn-success btn-sm">
                                                    Read More
                                                </Link>
                                            </div>
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


export default PlantBlog;





















