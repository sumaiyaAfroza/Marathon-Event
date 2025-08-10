import React, { useEffect, useState } from "react";
import { FaTrash, FaPen, FaRegCalendarAlt, FaUserEdit, FaPlusCircle, FaSearch, FaFilter, FaBookmark, FaHeart, FaShare, FaEye, FaComment, FaTags, FaUser, FaClock, FaSortAmountDown, FaBookOpen } from "react-icons/fa";

const Blogs = () => {
  const initialBlogs = [
    {
      id: 1,
      title: "The Spirit of Marathon",
      author: "Admin",
      content: "Marathons are not just races; they are journeys of determination and perseverance. Our platform aims to connect runners, inspire training, and create a community of endurance athletes.",
      date: "2025-08-01",
      category: "Inspiration",
      readTime: 5,
      likes: 24,
      bookmarks: 8,
      views: 156,
      tags: ["motivation", "community", "endurance"]
    },
    {
      id: 2,
      title: "Why Join a Marathon?",
      author: "Admin",
      content: "Joining a marathon helps build mental toughness, improve health, and develop strong community bonds. It's more than just a race; it's a life-changing experience.",
      date: "2025-08-02",
      category: "Benefits",
      readTime: 3,
      likes: 18,
      bookmarks: 5,
      views: 89,
      tags: ["health", "mental-strength", "life-change"]
    },
    {
      id: 3,
      title: "Training Tips for Beginners",
      author: "Coach John",
      content: "Start slow, increase your mileage gradually, and focus on consistency. Remember to include rest days for recovery.",
      date: "2025-08-03",
      category: "Training",
      readTime: 7,
      likes: 42,
      bookmarks: 15,
      views: 203,
      tags: ["beginner", "training", "consistency"]
    },
    {
      id: 4,
      title: "Marathon Nutrition 101",
      author: "Nutrition Expert",
      content: "Balanced meals, proper hydration, and the right supplements can greatly improve your performance during training and on race day.",
      date: "2025-08-04",
      category: "Nutrition",
      readTime: 6,
      likes: 35,
      bookmarks: 12,
      views: 178,
      tags: ["nutrition", "hydration", "performance"]
    },
    {
      id: 5,
      title: "Top 5 Marathons in the World",
      author: "Travel Blogger",
      content: "From the Boston Marathon to the Berlin Marathon, discover the most iconic races around the globe and why they are special.",
      date: "2025-08-05",
      category: "Travel",
      readTime: 8,
      likes: 67,
      bookmarks: 23,
      views: 345,
      tags: ["travel", "iconic-races", "global"]
    },
    {
      id: 6,
      title: "Avoiding Injuries While Training",
      author: "Physiotherapist",
      content: "Proper warm-ups, strength training, and good running shoes are key to preventing common running injuries.",
      date: "2025-08-06",
      category: "Health",
      readTime: 5,
      likes: 29,
      bookmarks: 11,
      views: 134,
      tags: ["injury-prevention", "warm-up", "strength-training"]
    }
  ];

  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    category: "",
    tags: "",
    readTime: ""
  });
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [likedBlogs, setLikedBlogs] = useState(new Set());
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState(new Set());

  const categories = ["All", "Training", "Nutrition", "Health", "Inspiration", "Travel", "Benefits"];

  // Load blogs from memory (avoiding localStorage for Claude.ai compatibility)
  useEffect(() => {
    setBlogs([...initialBlogs]);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!formData.title || !formData.author || !formData.content) {
      alert("Please fill out all fields");
      return;
    }

    const tagsArray = formData.tags ? formData.tags.split(",").map(tag => tag.trim()) : [];

    if (editingId) {
      const updatedBlogs = blogs.map((blog) =>
        blog.id === editingId
          ? {
              ...blog,
              title: formData.title,
              author: formData.author,
              content: formData.content,
              category: formData.category || "General",
              tags: tagsArray,
              readTime: parseInt(formData.readTime) || 5,
            }
          : blog
      );
      setBlogs(updatedBlogs);
      setEditingId(null);
    } else {
      const newBlog = {
        id: Date.now() + Math.random(), // More unique ID
        title: formData.title,
        author: formData.author,
        content: formData.content,
        category: formData.category || "General",
        date: new Date().toISOString().split("T")[0],
        readTime: parseInt(formData.readTime) || 5,
        likes: 0,
        bookmarks: 0,
        views: 0,
        tags: tagsArray
      };
      const updatedBlogs = [newBlog, ...blogs];
      setBlogs(updatedBlogs);
      console.log("New blog added:", newBlog); // Debug log
    }
    setFormData({ title: "", author: "", content: "", category: "", tags: "", readTime: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      author: blog.author,
      content: blog.content,
      category: blog.category || "",
      tags: blog.tags ? blog.tags.join(", ") : "",
      readTime: blog.readTime?.toString() || ""
    });
    setEditingId(blog.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLike = (id) => {
    const newLikedBlogs = new Set(likedBlogs);
    if (newLikedBlogs.has(id)) {
      newLikedBlogs.delete(id);
      setBlogs(blogs.map(blog => blog.id === id ? {...blog, likes: blog.likes - 1} : blog));
    } else {
      newLikedBlogs.add(id);
      setBlogs(blogs.map(blog => blog.id === id ? {...blog, likes: blog.likes + 1} : blog));
    }
    setLikedBlogs(newLikedBlogs);
  };

  const handleBookmark = (id) => {
    const newBookmarkedBlogs = new Set(bookmarkedBlogs);
    if (newBookmarkedBlogs.has(id)) {
      newBookmarkedBlogs.delete(id);
      setBlogs(blogs.map(blog => blog.id === id ? {...blog, bookmarks: blog.bookmarks - 1} : blog));
    } else {
      newBookmarkedBlogs.add(id);
      setBlogs(blogs.map(blog => blog.id === id ? {...blog, bookmarks: blog.bookmarks + 1} : blog));
    }
    setBookmarkedBlogs(newBookmarkedBlogs);
  };

  // Filter and sort blogs
  let filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesCategory;
  });

  // Sort blogs
  filteredBlogs = filteredBlogs.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date) - new Date(a.date);
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "popular":
        return (b.likes + b.views) - (a.likes + a.views);
      case "readTime":
        return a.readTime - b.readTime;
      default:
        return 0;
    }
  });

  const getCategoryColor = (category) => {
    const colors = {
      "Training": "bg-blue-500",
      "Nutrition": "bg-green-500",
      "Health": "bg-red-500",
      "Inspiration": "bg-purple-500",
      "Travel": "bg-yellow-500",
      "Benefits": "bg-indigo-500",
      "General": "bg-gray-500"
    };
    return colors[category] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <FaBookOpen className="text-2xl" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
              Marathon Blogs
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover inspiring stories, expert tips, and insider knowledge from the marathon community
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 rounded-2xl shadow-xl p-6 mb-8 border border-white/50 dark:border-gray-700/50">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex gap-3 flex-wrap flex-1">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="readTime">Quick Reads</option>
              </select>
              
              <div className="flex border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-3 ${viewMode === "grid" ? "bg-blue-500 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-3 ${viewMode === "list" ? "bg-blue-500 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Creation Form */}
        <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 rounded-2xl shadow-xl p-8 mb-8 border border-white/50 dark:border-gray-700/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white">
              <FaPlusCircle className="text-xl" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {editingId ? "Edit Blog Post" : "Create New Blog Post"}
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <input
              type="text"
              name="title"
              placeholder="Blog Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            <input
              type="text"
              name="author"
              placeholder="Author Name"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select Category</option>
              {categories.slice(1).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="number"
              name="readTime"
              placeholder="Read Time (minutes)"
              value={formData.readTime}
              onChange={handleChange}
              className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            <input
              type="text"
              name="tags"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={handleChange}
              className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white lg:col-span-2"
            />
          </div>
          
          <textarea
            name="content"
            placeholder="Write your blog content here..."
            value={formData.content}
            onChange={handleChange}
            rows="6"
            className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white mt-6"
          />
          
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSubmit}
              className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              {editingId ? (
                <>
                  <FaUserEdit /> Update Blog
                </>
              ) : (
                <>
                  <FaPen /> Publish Blog
                </>
              )}
            </button>
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({ title: "", author: "", content: "", category: "", tags: "", readTime: "" });
                }}
                className="bg-gray-500 text-white px-6 py-4 rounded-xl font-bold hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-xl">
            <div className="text-3xl font-black">{blogs.length}</div>
            <div className="opacity-90">Total Blogs</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-xl">
            <div className="text-3xl font-black">{categories.length - 1}</div>
            <div className="opacity-90">Categories</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-xl">
            <div className="text-3xl font-black">{blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)}</div>
            <div className="opacity-90">Total Likes</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-xl">
            <div className="text-3xl font-black">{blogs.reduce((sum, blog) => sum + (blog.views || 0), 0)}</div>
            <div className="opacity-90">Total Views</div>
          </div>
        </div>

        {/* Debug Info */}
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg mb-4 text-sm">
          <p>Total blogs: {blogs.length} | Filtered: {filteredBlogs.length} | Category: {selectedCategory}</p>
        </div>

        {/* Blog List */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <FaBookOpen className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-500 dark:text-gray-400 mb-2">No blogs found</h3>
            <p className="text-gray-400 dark:text-gray-500">Try adjusting your search or filter criteria</p>
            <p className="text-sm text-gray-400 mt-2">Total blogs available: {blogs.length}</p>
          </div>
        ) : (
          <div className={`grid gap-8 ${viewMode === "grid" ? "lg:grid-cols-2" : "grid-cols-1"}`}>
            {filteredBlogs.map((blog, index) => (
              <div
                key={blog.id}
                className="group bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50 dark:border-gray-700/50"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 ${getCategoryColor(blog.category)} text-white text-xs font-bold rounded-full`}>
                          {blog.category}
                        </span>
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                          <FaClock />
                          <span>{blog.readTime || 5} min read</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {blog.title}
                      </h3>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-300"
                        title="Edit"
                      >
                        <FaPen />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-300"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <FaUser />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaRegCalendarAlt />
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-3">
                    {blog.content}
                  </p>
                  
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex items-center gap-2 mb-6">
                      <FaTags className="text-gray-400" />
                      <div className="flex gap-2 flex-wrap">
                        {blog.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handleLike(blog.id)}
                        className={`flex items-center gap-2 transition-colors duration-300 ${
                          likedBlogs.has(blog.id) ? "text-red-500" : "text-gray-500 hover:text-red-500"
                        }`}
                      >
                        <FaHeart className={likedBlogs.has(blog.id) ? "fill-current" : ""} />
                        <span>{blog.likes || 0}</span>
                      </button>
                      
                      <button
                        onClick={() => handleBookmark(blog.id)}
                        className={`flex items-center gap-2 transition-colors duration-300 ${
                          bookmarkedBlogs.has(blog.id) ? "text-blue-500" : "text-gray-500 hover:text-blue-500"
                        }`}
                      >
                        <FaBookmark className={bookmarkedBlogs.has(blog.id) ? "fill-current" : ""} />
                        <span>{blog.bookmarks || 0}</span>
                      </button>
                      
                      <div className="flex items-center gap-2 text-gray-500">
                        <FaEye />
                        <span>{blog.views || 0}</span>
                      </div>
                    </div>
                    
                    <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors duration-300">
                      <FaShare />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;