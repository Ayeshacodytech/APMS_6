import React from "react";

export function BatchDropDown() {
  return (
    <div className="flex flex-col">
      <select
        id="batch"
        name="batch"
        className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
      >
        <option value="A">A</option>
        <option value="B">B</option>
      </select>
    </div>
  );
}
