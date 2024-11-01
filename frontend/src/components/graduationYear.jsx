import React from "react";

export function GraduationYearDropdown({ onChange, value }) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  // Create an array of graduation years for the last 30 years
  const graduationYears = Array.from(
    { length: 41 },
    (_, i) => currentYear - 30 + i
  );
  return (
    <div className="flex flex-col">
      <select
        id="graduationYear"
        name="graduationYear"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
      >
        <option value="" disabled>
          Select year
        </option>
        {graduationYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
