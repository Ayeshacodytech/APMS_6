import React from "react";

export function EditableIsPlaced({ onChange, value, readOnly }) {
    return (
        <div className="flex flex-col py-1">
            {readOnly ? (
                <div className="block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md text-gray-700 cursor-default">
                    {value ? "Yes" : "No"}
                </div>
            ) : (
                <select
                    id="isplaced"
                    name="isplaced"
                    onChange={(e) => onChange("isPlaced", e.target.value === "true")}
                    value={value ? "true" : "false"}
                    className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                >
                    <option value="" disabled>Select your status</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            )}
        </div>
    );
}
