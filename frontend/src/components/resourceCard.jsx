import { useState } from "react";
import DOMPurify from 'dompurify';
export default function ResourceCard({ resource = {} }) {
    const [showResource, setShowResource] = useState(false);

    const handleToggle = () => {
        setShowResource(prev => !prev);
    };

    return (
        <div
            className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 cursor-pointer"
            onClick={handleToggle}
        >
            <div className="p-8">
                {/* Topic */}
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                    {resource?.topic || "Resource Topic"}
                </h2>

                {/* Tags */}
                <div className="flex gap-2 mb-4">
                    {resource?.tags ? (
                        resource.tags.split(",").map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm"
                            >
                                {tag.trim()}
                            </span>
                        ))
                    ) : (
                        <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                            No Tags
                        </span>
                    )}
                </div>

                {/* Resource URL toggle */}
                {showResource ? (
                    <div className="mt-4">
                        <a
                            href={resource?.resource}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 underline"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(resource.resource) }}
                        />
                        
                    </div>
                ) : (
                    <div className="mt-4 text-gray-500 text-sm italic">
                        Click to show resource
                    </div>
                )}
            </div>
        </div>
    );
}
