import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";

function CreateBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Web Development");

  function handleSubmit(e) {
    e.preventDefault();

    const newBlog = {
      id: Date.now(),
      title,
      excerpt,
      content,
      author,
      category,
      date: new Date().toLocaleDateString(),
      readTime: "5 min read",
    };

    const existingBlogs =
      JSON.parse(localStorage.getItem("blogs")) || [];

    localStorage.setItem(
      "blogs",
      JSON.stringify([...existingBlogs, newBlog])
    );

    navigate("/");
  }

  return (
    <main className="page-enter max-w-3xl mx-auto px-6 py-12">

      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
      >
        <ArrowLeft size={16} />
        Back to Home
      </button>

      <div className="mt-10">

        <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Create
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
          Share something worth reading.
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-4">
          Write a story, share an idea, or teach something you know.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-7"
      >

        <div>
          <label className="block font-medium mb-2">
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your blog a title"
            required
            className="w-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white placeholder:text-gray-400 rounded-xl px-4 py-3 outline-none focus:border-black dark:focus:border-white transition"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Excerpt
          </label>

          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A short description of your blog"
            required
            className="w-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white placeholder:text-gray-400 rounded-xl px-4 py-3 outline-none focus:border-black dark:focus:border-white transition"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Content
          </label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing..."
            rows="12"
            required
            className="w-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white placeholder:text-gray-400 rounded-xl px-4 py-3 outline-none focus:border-black dark:focus:border-white transition resize-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Author
          </label>

          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            required
            className="w-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white placeholder:text-gray-400 rounded-xl px-4 py-3 outline-none focus:border-black dark:focus:border-white transition"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl px-4 py-3 outline-none focus:border-black dark:focus:border-white transition"
          >
            <option>Web Development</option>
            <option>Programming</option>
            <option>AI</option>
            <option>Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl hover:opacity-80 transition"
        >
          <Send size={16} />
          Publish Blog
        </button>

      </form>

    </main>
  );
}

export default CreateBlog;