import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const savedBlogs =
    JSON.parse(localStorage.getItem("blogs")) || [];

  const blog = savedBlogs.find(
    (blog) => blog.id === Number(id)
  );

  const [title, setTitle] = useState(blog?.title || "");
  const [excerpt, setExcerpt] = useState(blog?.excerpt || "");
  const [content, setContent] = useState(blog?.content || "");
  const [author, setAuthor] = useState(blog?.author || "");
  const [category, setCategory] = useState(
    blog?.category || "Web Development"
  );

  if (!blog) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">

        <h1 className="text-3xl font-bold">
          Blog not found
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-3">
          This blog cannot be edited.
        </p>

        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 mt-6 text-sm underline underline-offset-4"
        >
          <ArrowLeft size={16} />
          Go back home
        </button>

      </main>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updatedBlogs = savedBlogs.map((item) => {
      if (item.id === Number(id)) {
        return {
          ...item,
          title,
          excerpt,
          content,
          author,
          category,
        };
      }

      return item;
    });

    localStorage.setItem(
      "blogs",
      JSON.stringify(updatedBlogs)
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
          Edit
        </p>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
          Refine your story.
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-4">
          Make changes to your blog and save when you're ready.
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
          <Save size={16} />
          Save Changes
        </button>

      </form>

    </main>
  );
}

export default EditBlog;