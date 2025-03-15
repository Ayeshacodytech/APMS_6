import React from "react";

export function EditableGraduationYearDropdown({ value, onChange, readOnly }) {
    const currentYear = new Date().getFullYear();
    // Generate years from 30 years ago to 10 years in the future
    const graduationYears = Array.from({ length: 41 }, (_, i) => currentYear - 30 + i);

    const handleChange = (e) => {
        console.log("Selected value: ", e.target.value); // Debug log
        onChange("YearofGraduation", e.target.value); // Pass both the field name and the value to the parent
    };

    return (
        <div className="flex flex-col py-1">
            {readOnly ? (
                <div className="block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md text-gray-700 cursor-default">
                    {value || "Not selected"}
                </div>
            ) : (
                <select
                    id="graduationYear"
                    name="graduationYear"
                    onChange={handleChange} // Use handleChange here
                    value={value || ""}
                    className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                >
                    <option value="" disabled>Select year</option>
                    {graduationYears.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}
