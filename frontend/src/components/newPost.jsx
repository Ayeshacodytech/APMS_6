
import React, { useState, useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { createCanvas, loadImage } from "canvas";
import { SideNavBar } from "./SideNavbar";
import CommunityHeader from "./communityHeader";

const NewPostForm = () => {
  const quillRef = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");

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
          "http://localhost:3000/api/v1/community/upload-image",
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await response.json();

        if (!response.ok) throw new Error(result.message);

        const resizedImageUrl = await resizeImage(result.imageUrl, 800); // Resize to 800px width

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, "image", resizedImageUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    };
  };

  // Function to resize an image
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
  console.log(content);
  return (
    <div className="grid grid-cols-6 bg-gradient-to-l object-fill min-h-screen">
      <div className="col-span-1">
        <SideNavBar />
      </div>

      {/* Main Content */}
      <div className="col-span-5">
        <div className="pl-8 pr-1">
          <CommunityHeader></CommunityHeader>
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
            />

            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-2">Preview:</h3>
              <div
                className="h-96 border p-4 bg-gray-50"
                // Using dangerouslySetInnerHTML to properly render the HTML content
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(content),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPostForm;
