import { useNavigate } from "react-router-dom";

export default function JobHeader() {
  const navigate = useNavigate();
  return (
    <nav className="h-16 shadow-lg border rounded-lg backdrop-blur bg-white/30">
      <div className="flex justify-between items-center h-full px-2">
        <div className="flex items-center">
          <div className="flex items-center justify-center">
            <svg
              width="150"
              height="150"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <text
                x="20"
                y="100"
                fontFamily="grechen"
                font-size="100"
                font-weight="bold"
                fill="white"
              >
                F
              </text>
              <text
                x="50"
                y="100"
                fontFamily="grechen"
                font-size="50"
                font-weight="bold"
                fill="white"
              >
                F
              </text>
            </svg>
          </div>
          <span className="fontfamily-grechen text-2xl text-[#6366F1] font-bold">
            Futureforge
          </span>
        </div>

        <div className="flex justify-end items-center h-full px-6 gap-6">
          <button
            className="p-2 hover:bg-indigo-50 rounded-xl transition-all"
            title="Job Home"
            onClick={() => navigate("/jobs")} // Fixed here
          >
            <svg
              fill="#6366F1"
              width="28px"
              height="28px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#6366F1"
            >
              <path d="M3.012,10.981,3,11H5v9a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V11h2a1,1,0,0,0,.555-1.832l-9-6a1,1,0,0,0-1.11,0l-9,6a1,1,0,0,0-.277,1.387A.98.98,0,0,0,3.012,10.981ZM10,14a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1v5H10Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
