import React, { useState } from 'react';
import { SideNavBar } from "../components/SideNavbar";
import { motion } from 'framer-motion';
import CommunityHeader from '../components/communityHeader';
import { Comment } from '../components/comment';

function Community() {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(42); // Default likes count

    const handleLikeToggle = () => {
        setIsLiked(!isLiked);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    };
    const mockComment = {
        id: "aac25939-bfce-4a49-8a56-8b73b5e3c8b4",
        message: "very useful",
        date: "2025-01-26T16:28:04.582Z",
        authorId: "581e1914-4eae-40be-bb80-3ddcb734cbd9",
        postId: "c6d268f3-ad50-485e-b2fa-3b84747e0a44",
        createdAt: "2025-01-26T16:28:04.582Z",
        author: {
            id: "581e1914-4eae-40be-bb80-3ddcb734cbd9",
            name: "Dineshdd",
            email: "dinesh@gmail.com",
        },
        likes: [],
        replies: [
            {
                id: "35ab1e58-0a2f-4459-b584-c1d633b771c8",
                message: "@undefined yes",
                date: "2025-02-15T11:19:30.833Z",
                authorId: "1b250ae0-8995-4545-b51c-15f5044cc668",
                parentCommentId: "aac25939-bfce-4a49-8a56-8b73b5e3c8b4",
                createdAt: "2025-02-15T11:19:30.833Z",
                author: {
                    id: "1b250ae0-8995-4545-b51c-15f5044cc668",
                    name: "baby",
                },
                likes: [],
            },
            {
                id: "754a333d-e9bb-43a5-a6f3-1e8cc0266279",
                message: "@undefined yes",
                date: "2025-02-15T11:17:42.463Z",
                authorId: "1b250ae0-8995-4545-b51c-15f5044cc668",
                parentCommentId: "aac25939-bfce-4a49-8a56-8b73b5e3c8b4",
                createdAt: "2025-02-15T11:17:42.463Z",
                author: {
                    id: "1b250ae0-8995-4545-b51c-15f5044cc668",
                    name: "baby",
                },
                likes: [],
            },
        ],
    };
    return (
        <div className="grid grid-cols-6 bg-gradient-to-l object-fill min-h-screen">
            <div className="col-span-1">
                <SideNavBar />
            </div>

            {/* Main Content */}
            <div className="col-span-5">
                <div className='pl-8 pr-1'>
                    <CommunityHeader></CommunityHeader>

                    {/* Main Content Area */}
                    <div className="py-2 px-8 pb-12 max-w-5xl mx-auto">
                        {/* Title Card */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                            <div className="p-8">
                                <div className="flex items-center gap-4 mb-6">

                                    <div>
                                        <h2 className="text-lg font-medium text-gray-900">Community Post</h2>
                                        <p className="text-sm text-gray-500">Posted 2 hours ago</p>
                                    </div>
                                </div>

                                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                    Understanding Modern Web Development
                                </h1>

                                <div className="flex gap-2 mb-6">
                                    <span className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm">
                                        Development
                                    </span>
                                    <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm">
                                        Web
                                    </span>
                                </div>

                                <div className="prose prose-indigo max-w-none">
                                    <p className="text-gray-600 leading-relaxed">
                                        To view and manage data in your Prisma Data Platform project, you can use Prisma Studio, a visual interface provided by Prisma. Here’s how you can access and interact with your database data using Prisma Studio:
                                        Launch Prisma Studio: Run the command npx prisma studio in your terminal. This command will open a new browser tab where you can view and manipulate your database data directly.
                                        Connect to Your Database: Ensure that your database connection URL is correctly set up in the .env file. The connection URL should be provided as the DATABASE_URL environment variable.
                                        View Data: Once Prisma Studio is open, you will see a list of all models defined in your Prisma schema file. Click on a model to open its data in a new tab. You can filter and search through the data using the Filters menu.
                                        Manage Data: Use Prisma Studio to add, edit, or delete records. You can also use keyboard shortcuts for quick navigation and manipulation of data.

                                    </p>
                                </div>
                            </div>

                            {/* Interactive Footer */}
                            <div className="border-t bg-gray-50">
                                <div className="px-8 py-4 flex items-center gap-6">
                                    <button
                                        onClick={handleLikeToggle}
                                        className={`flex items-center gap-2 transition-all ${isLiked ? 'text-pink-500' : 'text-gray-600 hover:text-pink-500'}`}
                                    >
                                        {isLiked ? (
                                            <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9 4.5C15.9 3 14.418 2 13.26 2c-.806 0-.869.612-.993 1.82-.055.53-.121 1.174-.267 1.93-.386 2.002-1.72 4.56-2.996 5.325V17C9 19.25 9.75 20 13 20h3.773c2.176 0 2.703-1.433 2.899-1.964l.013-.036c.114-.306.358-.547.638-.82.31-.306.664-.653.927-1.18.311-.623.27-1.177.233-1.67-.023-.299-.044-.575.017-.83.064-.27.146-.475.225-.671.143-.356.275-.686.275-1.329 0-1.5-.748-2.498-2.315-2.498H15.5S15.9 6 15.9 4.5zM5.5 10A1.5 1.5 0 0 0 4 11.5v7a1.5 1.5 0 0 0 3 0v-7A1.5 1.5 0 0 0 5.5 10z" fill="#000000"></path>
                                                </g>
                                            </svg>) : (
                                            <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9 4.5C15.9 3 14.418 2 13.26 2c-.806 0-.869.612-.993 1.82-.055.53-.121 1.174-.267 1.93-.386 2.002-1.72 4.56-2.996 5.325V17C9 19.25 9.75 20 13 20h3.773c2.176 0 2.703-1.433 2.899-1.964l.013-.036c.114-.306.358-.547.638-.82.31-.306.664-.653.927-1.18.311-.623.27-1.177.233-1.67-.023-.299-.044-.575.017-.83.064-.27.146-.475.225-.671.143-.356.275-.686.275-1.329 0-1.5-.748-2.498-2.315-2.498H15.5S15.9 6 15.9 4.5zM5.5 10A1.5 1.5 0 0 0 4 11.5v7a1.5 1.5 0 0 0 3 0v-7A1.5 1.5 0 0 0 5.5 10z" fill="#ffffff"></path>
                                                </g>
                                            </svg>
                                        )}

                                        <span className="font-medium">42</span>
                                    </button>

                                    <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-500 transition-all">
                                        <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M10.968 18.769C15.495 18.107 19 14.434 19 9.938a8.49 8.49 0 0 0-.216-1.912C20.718 9.178 22 11.188 22 13.475a6.1 6.1 0 0 1-1.113 3.506c.06.949.396 1.781 1.01 2.497a.43.43 0 0 1-.36.71c-1.367-.111-2.485-.426-3.354-.945A7.434 7.434 0 0 1 15 19.95a7.36 7.36 0 0 1-4.032-1.181z" fill="#000000"></path><path d="M7.625 16.657c.6.142 1.228.218 1.875.218 4.142 0 7.5-3.106 7.5-6.938C17 6.107 13.642 3 9.5 3 5.358 3 2 6.106 2 9.938c0 1.946.866 3.705 2.262 4.965a4.406 4.406 0 0 1-1.045 2.29.46.46 0 0 0 .386.76c1.7-.138 3.041-.57 4.022-1.296z" fill="#000000"></path></g></svg>

                                        <span className="font-medium">24</span>
                                    </button>

                                </div>
                            </div>

                            <div>
                                {/* comment part */}
                                <Comment comment={mockComment}></Comment>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Community;