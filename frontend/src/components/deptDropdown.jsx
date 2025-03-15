import React from "react";

export function DeptDropdown({onChange,value}) {
  return (
    <div className="flex flex-col">
      <select
        id="dept"
        name="dept"
        onChange={onChange}
        value={value}
        className="block w-full px-3 py-2 border border-gray-300 bg-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
      >
        <option value="" disabled>Select a department</option>
        <option value="ECE">ECE</option>
        <option value="Mech">Mech</option>
        <option value="Civil">Civil</option>
        <option value="EEE">EEE</option>
        <option value="CSE">CSE</option>
      </select>
    </div>
  );
}
