import React from "react";

export function GraduationYearDropdown() {
  // Adjust the years as needed
  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 10 }, (_, i) => currentYear + i);

  return (
    <div className="flex flex-col">
      <select
        id="graduationYear"
        name="graduationYear"
        className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
      >
        {graduationYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
