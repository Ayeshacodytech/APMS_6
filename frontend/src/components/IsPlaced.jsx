import React from "react";

export function IsPlaced({ onChange, value }) {
  return (
    <div className="flex flex-col">
      <select
        id="isplaced"
        name="isplaced"
        onChange={onChange}
        value={value}
        className="block w-full px-3 py-2 border border-gray-300 text-black bg-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
      >
        <option value="" disabled>
          Select your status
        </option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
  );
}
