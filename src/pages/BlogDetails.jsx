import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  Heart,
  Send,
  Trash2,
} from "lucide-react";
import blogs from "../data/blogs";

function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const savedBlogs =
      JSON.parse(localStorage.getItem("blogs")) || [];

    const allBlogs = [...blogs, ...savedBlogs];

    const foundBlog = allBlogs.find(
      (blog) => blog.id === Number(id)
    );

    setBlog(foundBlog);

    const savedLikes =
      JSON.parse(localStorage.getItem("likes")) || {};

    const currentLike = savedLikes[id] || {
      liked: false,
      count: 0,
    };

    setIsLiked(currentLike.liked);
    setLikes(currentLike.count);

    const savedComments =
      JSON.parse(localStorage.getItem("comments")) || {};

    setComments(savedComments[id] || []);
  }, [id]);

  function handleLike() {
    const savedLikes =
      JSON.parse(localStorage.getItem("likes")) || {};

    const currentLike = savedLikes[id] || {
      liked: false,
      count: 0,
    };

    const updatedLike = {
      liked: !currentLike.liked,
      count: currentLike.liked
        ? Math.max(0, currentLike.count - 1)
        : currentLike.count + 1,
    };

    const updatedLikes = {
      ...savedLikes,
      [id]: updatedLike,
    };

    localStorage.setItem(
      "likes",
      JSON.stringify(updatedLikes)
    );

    setIsLiked(updatedLike.liked);
    setLikes(updatedLike.count);
  }

  function handleCommentSubmit(e) {
    e.preventDefault();

    if (!commentName.trim() || !commentText.trim()) {
      return;
    }

    const newComment = {
      id: Date.now(),
      name: commentName.trim(),
      text: commentText.trim(),
      date: "Just now",
    };

    const savedComments =
      JSON.parse(localStorage.getItem("comments")) || {};

    const updatedComments = {
      ...savedComments,
      [id]: [
        ...(savedComments[id] || []),
        newComment,
      ],
    };

    localStorage.setItem(
      "comments",
      JSON.stringify(updatedComments)
    );

    setComments(updatedComments[id]);

    setCommentName("");
    setCommentText("");
  }

  function handleDeleteComment(commentId) {
    const savedComments =
      JSON.parse(localStorage.getItem("comments")) || {};

    const updatedBlogComments = (
      savedComments[id] || []
    ).filter((comment) => comment.id !== commentId);

    const updatedComments = {
      ...savedComments,
      [id]: updatedBlogComments,
    };

    localStorage.setItem(
      "comments",
      JSON.stringify(updatedComments)
    );

    setComments(updatedBlogComments);
  }

  if (!blog) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-20 text-center">

        <h1 className="text-4xl font-bold">
          Blog not found
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-4">
          The blog you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-6 text-sm underline underline-offset-4"
        >
          <ArrowLeft size={16} />
          Go back home
        </Link>

      </main>
    );
  }

  return (
    <main className="page-enter max-w-4xl mx-auto px-6 py-12">

      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <article className="mt-12">

        <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
          {blog.category}
        </p>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mt-4 leading-tight">
          {blog.title}
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mt-6 leading-relaxed">
          {blog.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-8 pb-8 border-b border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">

          <span className="font-medium text-gray-800 dark:text-gray-200">
            {blog.author}
          </span>

          <span>•</span>

          <span>{blog.date}</span>

          <span>•</span>

          <span className="flex items-center gap-1">
            <Clock size={15} />
            {blog.readTime}
          </span>

        </div>

        <div className="mt-10 text-lg leading-8 text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {blog.content}
        </div>

        {/* Like */}

        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">

          <button
            onClick={handleLike}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border transition ${
              isLiked
                ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                : "border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Heart
              size={19}
              fill={isLiked ? "currentColor" : "none"}
            />

            {likes} {likes === 1 ? "Like" : "Likes"}
          </button>

        </div>

      </article>

      {/* Comments */}

      <section className="mt-16">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Comments
          </h2>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            {comments.length}{" "}
            {comments.length === 1
              ? "comment"
              : "comments"}
          </span>

        </div>

        {/* Comment Form */}

        <form
          onSubmit={handleCommentSubmit}
          className="mt-6 space-y-4"
        >

          <input
            type="text"
            placeholder="Your name"
            value={commentName}
            onChange={(e) =>
              setCommentName(e.target.value)
            }
            className="w-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white placeholder:text-gray-400 rounded-xl px-4 py-3 outline-none focus:border-black dark:focus:border-white transition"
          />

          <textarea
            placeholder="Share your thoughts..."
            value={commentText}
            onChange={(e) =>
              setCommentText(e.target.value)
            }
            rows="4"
            className="w-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white placeholder:text-gray-400 rounded-xl px-4 py-3 outline-none focus:border-black dark:focus:border-white transition resize-none"
          />

          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-5 py-3 rounded-xl hover:opacity-80 transition"
          >
            <Send size={16} />
            Post Comment
          </button>

        </form>

        {/* Comments List */}

        <div className="mt-10 space-y-5">

          {comments.length === 0 ? (
            <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl text-center py-12">

              <p className="text-gray-500 dark:text-gray-400">
                No comments yet. Be the first to share your thoughts.
              </p>

            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="font-semibold">
                      {comment.name}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {comment.date}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      handleDeleteComment(comment.id)
                    }
                    className="text-gray-400 hover:text-black dark:hover:text-white transition"
                    aria-label="Delete comment"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

                <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                  {comment.text}
                </p>

              </div>
            ))
          )}

        </div>

      </section>

    </main>
  );
}

export default BlogDetails;