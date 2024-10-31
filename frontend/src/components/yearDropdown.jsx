import React from "react";

export function YearDropdown() {
  return (
    <div className="flex flex-col">
      <select
        id="year"
        name="year"
        className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
      >
        <option value="1st">1st Year</option>
        <option value="2nd">2nd Year</option>
        <option value="3rd">3rd Year</option>
        <option value="4th">4th Year</option>
      </select>
    </div>
  );
}
