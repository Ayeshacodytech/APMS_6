import React, { useState } from "react";

export function EditableYearDropdown({ onChange, value, readOnly }) {

    return (
        <div className="flex flex-col">
            {readOnly ? (
                <div className="block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md text-gray-700 cursor-default">
                {value || "Select year"}
            </div>
            ) : (
                <select
                    id="year"
                    name="year"
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                    value={value}
                    className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                >
                    <option value="" disabled>Select your current year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                </select>
            )}
        </div>
    );
}
