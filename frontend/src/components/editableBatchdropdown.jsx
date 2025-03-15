import React from "react";

export function EditableBatchDropDown({ value, onChange, readOnly }) {
    return (
        <div className="flex flex-col py-1">
            {readOnly ? (
                <div className="block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md text-gray-700 cursor-default">
                    {value || "Not Selected"}
                </div>
            ) : (
                <select
                    id="batch"
                    name="batch"
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                    value={value || ""}
                    className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                >
                    <option value="" disabled>Select a batch</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
            )}
        </div>
    );
}
