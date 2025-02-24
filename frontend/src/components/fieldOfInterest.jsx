import React from "react";

export function FieldOfInterest({ onChange, value }) {
  return (
    <div className="flex flex-col">
      <select
        id="Interest"
        name="Interest"
        onChange={onChange}
        value={value}
        className="block w-full px-3 py-2 border border-gray-300 bg-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
      >
        <option value="" disabled>
          Select your field of interest
        </option>
        <option value="Core">Core</option>
        <option value="IT">IT</option>
      </select>
    </div>
  );
}
