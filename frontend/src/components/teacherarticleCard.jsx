
import { useNavigate } from "react-router-dom";

export default function TeacherArticleCard({ post }) {
    const navigate = useNavigate(); // useNavigate() instead of useHistory()

    const handleClick = () => {
        if (!post.id) return;
        navigate(`/teacher/community/${post.id}`); // Fix navigation
    };
    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
            onClick={handleClick}
        >
            <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">{post.community || "Community Post"}</h2>
                        <p className="text-sm text-gray-500">Posted {post.createdAt ? new Date(post.createdAt).toLocaleString() : "Some time ago"}</p>
                    </div>
                </div>

                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    {post.title || "Untitled Post"}
                </h1>

                {/* Tags */}
                <div className="flex gap-2 mb-6">
                    {/* Check if the topic exists */}
                    {post.topic ? (
                        // Split the topic string if multiple topics are present
                        post.topic.split(",").map((topic, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm"
                            >
                                {topic.trim()} {/* trim to remove any extra spaces */}
                            </span>
                        ))
                    ) : (
                        <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">No Topic</span>
                    )}
                </div>

            </div>
        </div>
    );
}
