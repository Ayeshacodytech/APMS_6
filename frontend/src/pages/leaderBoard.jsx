import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { SideNavBar } from "../components/SideNavbar";
import CodeHeader from "../components/codeHeader";

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get(
                    "https://futureforge.onrender.com/api/v1/submission/leaderboard",
                    {
                        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                    }
                );

                // Sorting by points in descending order
                const sortedData = response.data.sort((a, b) => b.points - a.points);
                setLeaderboard(sortedData);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );

    if (!leaderboard.length)
        return (
            <div className="text-center text-gray-500 mt-10">No leaderboard data available.</div>
        );

    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">
            <SideNavBar />
            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <CodeHeader />
                <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">🏆 Leaderboard 🏆</h2>

                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="py-2 px-4">Rank</th>
                                <th className="py-2 px-4">Username</th>
                                <th className="py-2 px-4">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((entry, index) => (
                                <tr
                                    key={entry.id}
                                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                        } border-b border-gray-200`}
                                >
                                    <td className="py-2 px-4 text-center font-bold">{index + 1}</td>
                                    <td className="py-2 px-4 text-center">{entry.name}</td>
                                    <td className="py-2 px-4 text-center font-semibold text-blue-600">
                                        {entry.points}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;
