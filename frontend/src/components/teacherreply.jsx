export function TeacherReply({ reply }) {
    return (
        <div className="px-6 py-3 border-l-2 border-gray-300">
            <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-lg text-gray-900 dark:text-gray-800">
                    {reply.author.name}
                </div>
                
            </div>
            <p className="text-gray-700 dark:text-gray-700 mb-3">{reply.message}</p>
        </div>
    );
};
export default TeacherReply