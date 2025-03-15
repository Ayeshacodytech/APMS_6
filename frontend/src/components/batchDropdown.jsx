import React from "react";

export function BatchDropDown({onChange,value}) {
  return (
    <div className="flex flex-col">
      <select
        id="batch"
        name="batch"
        onChange={onChange}
        value={value}
        className="block w-full px-3 py-2 border border-gray-300 bg-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
      >
        <option value="" disabled>Select a batch</option>
        <option value="A">A</option>
        <option value="B">B</option>
      </select>
    </div>
  );
}
