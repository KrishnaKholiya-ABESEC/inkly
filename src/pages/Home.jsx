import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Bookmark } from "lucide-react";
import blogs from "../data/blogs";
import BlogCard from "../components/BlogCard";

function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showSaved, setShowSaved] = useState(false);
  const [allBlogs, setAllBlogs] = useState(blogs);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const savedBlogs =
      JSON.parse(localStorage.getItem("blogs")) || [];

    const savedBookmarks =
      JSON.parse(localStorage.getItem("bookmarks")) || [];

    const userBlogs = savedBlogs.map((blog) => ({
      ...blog,
      isUserCreated: true,
    }));

    setAllBlogs([...blogs, ...userBlogs]);
    setBookmarks(savedBookmarks);
  }, []);

  function handleDelete(id) {
    const savedBlogs =
      JSON.parse(localStorage.getItem("blogs")) || [];

    const updatedBlogs = savedBlogs.filter(
      (blog) => blog.id !== id
    );

    localStorage.setItem(
      "blogs",
      JSON.stringify(updatedBlogs)
    );

    setAllBlogs([
      ...blogs,
      ...updatedBlogs.map((blog) => ({
        ...blog,
        isUserCreated: true,
      })),
    ]);
  }

  const categories = [
    "All",
    ...new Set(allBlogs.map((blog) => blog.category)),
  ];

  const filteredBlogs = allBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || blog.category === category;

    const matchesSaved =
      !showSaved || bookmarks.includes(blog.id);

    return matchesSearch && matchesCategory && matchesSaved;
  });

  function handleSavedClick() {
    const savedBookmarks =
      JSON.parse(localStorage.getItem("bookmarks")) || [];

    setBookmarks(savedBookmarks);
    setShowSaved(!showSaved);
  }

  return (
    <main className="page-enter max-w-7xl mx-auto px-6 py-12">

      <section className="py-12 md:py-20">

        <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Welcome to Inkly
        </p>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mt-4 max-w-4xl">
          Stories, ideas and things worth reading.
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl leading-relaxed">
          Explore thoughts, experiences and ideas from different writers.
          Find something interesting, learn something new, or share your own story.
        </p>

      </section>

      <section className="mb-10">

        <div className="flex flex-col md:flex-row gap-4">

          <div className="relative flex-1">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl pl-12 pr-4 py-3 outline-none focus:border-black dark:focus:border-white transition"
            />

          </div>

          <div className="relative">

            <SlidersHorizontal
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl pl-11 pr-10 py-3 outline-none focus:border-black dark:focus:border-white transition appearance-none"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

          </div>

          <button
            onClick={handleSavedClick}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl border transition ${
              showSaved
                ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                : "border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Bookmark
              size={17}
              fill={showSaved ? "currentColor" : "none"}
            />
            Saved
          </button>

        </div>

      </section>

      <section>

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold">
            {showSaved ? "Saved stories" : "Latest stories"}
          </h2>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredBlogs.length}{" "}
            {filteredBlogs.length === 1 ? "story" : "stories"}
          </span>

        </div>

        {filteredBlogs.length === 0 ? (
          <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl text-center py-20">

            <h2 className="text-2xl font-bold">
              {showSaved ? "No saved blogs" : "No blogs found"}
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {showSaved
                ? "Bookmark a blog to find it here."
                : "Try a different search or category."}
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onDelete={handleDelete}
              />
            ))}

          </div>
        )}

      </section>

    </main>
  );
}

export default Home;