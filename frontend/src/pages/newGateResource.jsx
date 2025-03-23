import DOMPurify from 'dompurify';
import React, { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { SideNavBar } from '../components/SideNavbar';
import { createResource } from '../store/slices/gateSlice';
import GateHeader from '../components/gateHeader';

const NewGateResourceForm = () => {
    const quillRef = useRef(null);
    const dispatch = useDispatch();
    const [showPreview, setShowPreview] = useState(false);
    const [topic, setTopic] = useState("");
    const [tags, setTags] = useState("");
    const [resource, setResource] = useState("");

    // Quill modules configuration
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['link'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                ['clean']
            ]
        }
    }), []);

    // Quill formats configuration
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'align',
        'link',
        'list',
        'script'
    ];

    const handlePreview = () => {
        setShowPreview(true);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sanitize resource content before sending
        const sanitizedResource = DOMPurify.sanitize(resource);
        const payload = { topic, resource: sanitizedResource, tags };

        console.log("Submitting Payload:", payload); // Debugging

        try {
            await dispatch(createResource(payload)).unwrap();
            alert("Resource Submitted Successfully!");
            setTopic("");
            setTags("");
            setResource("");
        } catch (error) {
            console.error("Error creating resource:", error.response?.data || error.message);
            alert("Failed to submit resource");
        }
    };



    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">
            <SideNavBar />

            {/* Main Content */}
            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <GateHeader />
                <div className="max-w-3xl my-4 mx-auto p-4 border rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Create a New Resource
                    </h2>
                    <input
                        type="text"
                        placeholder="Enter Title"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full border p-2 rounded mb-3"
                    />
                    <input
                        type="text"
                        placeholder="Enter Tags (comma separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full border p-2 rounded mb-3"
                    />

                    <ReactQuill
                        ref={quillRef}
                        value={resource}
                        onChange={setResource}
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
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Preview:</h3>

                            {/* Title with Gradient Effect */}
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                {topic}
                            </h1>

                            {/* Topics Styled as Badges */}
                            <div className="flex gap-2 mb-6">
                                {tags.split(",").map((t, index) => (
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
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(resource) }} />
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default NewGateResourceForm;
