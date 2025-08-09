import React, { useEffect, useState } from "react";

const Blogs = () => {
  const initialBlogs = [
    {
      id: 1,
      title: "The Spirit of Marathon",
      author: "Admin",
      content:
        "Marathons are not just races; they are journeys of determination and perseverance. Our platform aims to connect runners, inspire training, and create a community of endurance athletes.",
      date: "2025-08-01",
    },
    {
      id: 2,
      title: "Why Join a Marathon?",
      author: "Admin",
      content:
        "Joining a marathon helps build mental toughness, improve health, and develop strong community bonds. It’s more than just a race; it’s a life-changing experience.",
      date: "2025-08-02",
    },
    {
      id: 3,
      title: "Training Tips for Beginners",
      author: "Coach John",
      content:
        "Start slow, increase your mileage gradually, and focus on consistency. Remember to include rest days for recovery.",
      date: "2025-08-03",
    },
    {
      id: 4,
      title: "Marathon Nutrition 101",
      author: "Nutrition Expert",
      content:
        "Balanced meals, proper hydration, and the right supplements can greatly improve your performance during training and on race day.",
      date: "2025-08-04",
    },
    {
      id: 5,
      title: "Top 5 Marathons in the World",
      author: "Travel Blogger",
      content:
        "From the Boston Marathon to the Berlin Marathon, discover the most iconic races around the globe and why they are special.",
      date: "2025-08-05",
    },
    {
      id: 6,
      title: "Avoiding Injuries While Training",
      author: "Physiotherapist",
      content:
        "Proper warm-ups, strength training, and good running shoes are key to preventing common running injuries.",
      date: "2025-08-06",
    },
    {
      id: 7,
      title: "Marathon Mindset",
      author: "Mental Coach",
      content:
        "Your mindset can make or break your race. Stay positive, visualize success, and break your race into manageable sections.",
      date: "2025-08-07",
    },
    {
      id: 8,
      title: "Running Gear Essentials",
      author: "Sports Brand",
      content:
        "Quality shoes, breathable clothing, and a good GPS watch can make training and racing more comfortable and efficient.",
      date: "2025-08-08",
    },
    {
      id: 9,
      title: "Post-Marathon Recovery",
      author: "Wellness Coach",
      content:
        "After your marathon, give your body time to recover. Light stretching, hydration, and adequate sleep are crucial.",
      date: "2025-08-09",
    },
    {
      id: 10,
      title: "Why We Love Marathons",
      author: "Community Team",
      content:
        "Marathons bring people together, create unforgettable memories, and challenge the human spirit like no other sport.",
      date: "2025-08-10",
    },
  ];

  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
  });

  // Load blogs from localStorage or initial data
  useEffect(() => {
    const storedBlogs = localStorage.getItem("marathonBlogs");
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      setBlogs(initialBlogs);
      localStorage.setItem("marathonBlogs", JSON.stringify(initialBlogs));
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle blog submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.content) {
      alert("Please fill out all fields");
      return;
    }

    const newBlog = {
      id: Date.now(),
      title: formData.title,
      author: formData.author,
      content: formData.content,
      date: new Date().toISOString().split("T")[0],
    };

    const updatedBlogs = [newBlog, ...blogs];
    setBlogs(updatedBlogs);
    localStorage.setItem("marathonBlogs", JSON.stringify(updatedBlogs));
    setFormData({ title: "", author: "", content: "" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Marathon Blogs</h1>

      {/* Blog Post Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Write a Blog Post</h2>
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={formData.author}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />
        <textarea
          name="content"
          placeholder="Blog Content"
          value={formData.content}
          onChange={handleChange}
          rows="4"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Blog
        </button>
      </form>

      {/* Blog List */}
      <div className="space-y-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-500"
          >
            <h3 className="text-2xl font-semibold">{blog.title}</h3>
            <p className="text-gray-500 text-sm mb-2">
              By {blog.author} | {blog.date}
            </p>
            <p className="text-gray-700">{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
