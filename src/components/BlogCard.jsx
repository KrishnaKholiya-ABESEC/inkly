import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Pencil,
  Trash2,
  Bookmark,
  Heart,
} from "lucide-react";
import { useEffect, useState } from "react";

function BlogCard({ blog, onDelete }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const savedBookmarks =
      JSON.parse(localStorage.getItem("bookmarks")) || [];

    const savedLikes =
      JSON.parse(localStorage.getItem("likes")) || {};

    setIsBookmarked(savedBookmarks.includes(blog.id));
    setIsLiked(savedLikes[blog.id]?.liked || false);
    setLikes(savedLikes[blog.id]?.count || 0);
  }, [blog.id]);

  function handleBookmark(e) {
    e.preventDefault();

    const savedBookmarks =
      JSON.parse(localStorage.getItem("bookmarks")) || [];

    let updatedBookmarks;

    if (savedBookmarks.includes(blog.id)) {
      updatedBookmarks = savedBookmarks.filter(
        (id) => id !== blog.id
      );
      setIsBookmarked(false);
    } else {
      updatedBookmarks = [...savedBookmarks, blog.id];
      setIsBookmarked(true);
    }

    localStorage.setItem(
      "bookmarks",
      JSON.stringify(updatedBookmarks)
    );
  }

  function handleLike(e) {
    e.preventDefault();

    const savedLikes =
      JSON.parse(localStorage.getItem("likes")) || {};

    const currentLike = savedLikes[blog.id] || {
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
      [blog.id]: updatedLike,
    };

    localStorage.setItem(
      "likes",
      JSON.stringify(updatedLikes)
    );

    setIsLiked(updatedLike.liked);
    setLikes(updatedLike.count);
  }

  function handleDelete(e) {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) {
      return;
    }

    onDelete(blog.id);
  }

  return (
    <article className="group border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-white dark:bg-gray-900 hover:shadow-xl hover:-translate-y-1 transition duration-300">

      <Link to={`/blog/${blog.id}`}>

        <div className="flex items-center justify-between">

          <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {blog.category}
          </span>

          <div className="flex items-center gap-2">

            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white transition"
              aria-label={
                isLiked ? "Unlike blog" : "Like blog"
              }
            >
              <Heart
                size={18}
                fill={isLiked ? "currentColor" : "none"}
              />
              <span className="text-sm">
                {likes}
              </span>
            </button>

            <button
              onClick={handleBookmark}
              className="p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white transition"
              aria-label={
                isBookmarked
                  ? "Remove bookmark"
                  : "Bookmark blog"
              }
            >
              <Bookmark
                size={19}
                fill={isBookmarked ? "currentColor" : "none"}
              />
            </button>

            <ArrowUpRight
              size={20}
              className="text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition"
            />

          </div>

        </div>

        <h2 className="text-2xl font-bold mt-4 leading-tight group-hover:underline underline-offset-4">
          {blog.title}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between mt-8 text-sm text-gray-500 dark:text-gray-400">

          <span>{blog.author}</span>

          <span>{blog.readTime}</span>

        </div>

      </Link>

      {blog.isUserCreated && (
        <div className="flex gap-3 mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">

          <Link
            to={`/edit/${blog.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Pencil size={15} />
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Trash2 size={15} />
            Delete
          </button>

        </div>
      )}

    </article>
  );
}

export default BlogCard;