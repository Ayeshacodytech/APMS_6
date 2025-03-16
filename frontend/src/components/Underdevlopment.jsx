// src/components/UnderDevelopment.jsx
import React from "react";
import { SideNavBar } from "./SideNavbar";

const UnderDevelopment = () => {
    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">
            <SideNavBar />

            <div className="min-h-screen flex flex-col items-center justify-center text-white p-4">
                {/* Top SVG Icon (e.g., a laptop or coding icon) */}
                <div className="mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 5h18M4 7h16a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 17v.01"
                        />
                    </svg>
                </div>

                <h1 className="text-4xl text-indigo-600 font-bold mb-4">Page Under Development</h1>
                <p className="mb-6 text-indigo-600 text-lg text-center">
                    This page is currently under development. We're busy crafting some
                    awesome code!
                </p>

                {/* Second SVG Icon (e.g., a gear or code snippet icon) */}
                <div className="mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-24 w-24 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 20l9-5-9-5-9 5 9 5z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 12l9-5-9-5-9 5 9 5z"
                        />
                    </svg>
                </div>

                {/* Code snippet styled container */}
                <pre className="bg-gray-800 p-4 rounded-lg text-sm w-full max-w-md overflow-x-auto">
                    {`// Here's a little code snippet for you:

function helloWorld() {
  console.log("Hello, World!");
}

helloWorld();`}
                </pre>
                <p className="mt-6 text-indigo-600 text-center">
                    Check back soon for updates. Happy learning!
                </p>
            </div>
        </div>
    );
};

export default UnderDevelopment;
