import React from "react";

export function YearDropdown({onChange,value}) {
  return (
    <div className="flex flex-col">
      <select
        id="year"
        name="year"
        onChange={onChange}
        value={value}
        className="block w-full px-3 py-2 border border-gray-300 bg-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
      >
        <option value="" disabled>Select your current year</option>
        <option value="1st">1st Year</option>
        <option value="2nd">2nd Year</option>
        <option value="3rd">3rd Year</option>
        <option value="4th">4th Year</option>
      </select>
    </div>
  );
}
