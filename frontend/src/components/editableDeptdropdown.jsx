import React, { useState } from "react";

export function EditabledeptDropDown({ value, onChange, readOnly }) {
  return (
    <div className="flex flex-col py-1">
      {readOnly ? (
        <div className="block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md text-gray-700 cursor-default">
          {value || "Not Selected"}
        </div>
      ) : (
        <select
          id="department"
          name="department"
          onChange={(e) => onChange(e.target.name, e.target.value)}
          value={value}
          className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        >
          <option value="" disabled>
            Select your Department
          </option>
          <option value="ECE">ECE</option>
          <option value="Mech">Mech</option>
          <option value="Civil">Civil</option>
          <option value="EEE">EEE</option>
          <option value="CSE">CSE</option>
        </select>
      )}
    </div>
  );
}
