import { createCanvas } from "canvas";
import DOMPurify from "dompurify";
import React, { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { SideNavBar } from "../components/SideNavbar";
import CommunityHeader from "../components/communityHeader";
import { createPost } from "../store/slices/teachercommunityslice";
import { TeacherSideNavBar } from "../components/teacherSideNavbar";
import { TeacherCommunityHeader } from "../components/teachercommunityHeader";

const TeacherNewPostForm = () => {
  const quillRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  // Custom image handler
  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(
          "https://futureforge.onrender.com/api/v1/community/upload-image",
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);

        const cloudinaryUrl = result.imageUrl;

        if (!response.ok) throw new Error(result.message);

        const resizedImageUrl = await resizeImage(cloudinaryUrl, 800); // Resize to 800px width

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, "image", cloudinaryUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    };
  };

  // Function to resize an image
  const resizeImage = async (imageUrl, maxWidth) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Allow cross-origin image loading
    img.src = imageUrl;

    return new Promise((resolve, reject) => {
      img.onload = () => {
        const canvas = createCanvas(
          maxWidth,
          img.height * (maxWidth / img.width)
        );
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL()); // Return the resized image as a data URL
      };

      img.onerror = (err) => {
        reject("Error loading image: " + err);
      };
    });
  };

  // Quill modules configuration
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["link", "image", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  // Quill formats configuration
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "align",
    "link",
    "image",
    "code-block",
    "list",
    "script",
  ];

  const handlePreview = () => {
    setShowPreview(true);
  };
  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!title || !topic || !content) {
      alert("All fields are required!");
      return;
    }

    try {
      await dispatch(createPost({ title, topic, content })).unwrap();
      alert("Post Submitted Successfully!");
      setTitle("");
      setTopic("");
      setContent(""); // Reset form fields
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to submit post");
    }
  };
  console.log(content);

  return (
    <div className="bg-gradient-to-l object-fill min-h-screen">
      <TeacherSideNavBar />

      {/* Main Content */}
      <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
        <TeacherCommunityHeader />
        <div className="max-w-3xl my-4 mx-auto p-4 border rounded-lg shadow-md">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Create a New Post
          </h2>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded mb-3"
          />
          <input
            type="text"
            placeholder="Enter Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full border p-2 rounded mb-3"
          />

          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            theme="snow"
            placeholder="Write your blog post here..."
            className="h-64"
            style={{
              whiteSpace: "normal",
              wordWrap: "break-word",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              maxWidth: "100%",
            }}
          />

          <div className="mt-16 flex gap-4">
            <button
              onClick={handlePreview}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Preview
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Submit
            </button>
          </div>

          {showPreview && (
            <div className="mt-12 border p-4 bg-gray-50 rounded">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Preview:
              </h3>

              {/* Title with Gradient Effect */}
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {title}
              </h1>

              {/* Topics Styled as Badges */}
              <div className="flex gap-2 mb-6">
                {topic.split(",").map((t, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm"
                  >
                    {t.trim()}
                  </span>
                ))}
              </div>

              {/* Content Preview with Tailwind Prose Styling */}
              <div className="prose prose-indigo max-w-none overflow-y-auto">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(content),
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherNewPostForm;
