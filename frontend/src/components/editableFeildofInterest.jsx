export function EditableFeildofInterestDropDown({ value, onChange, readOnly }) {
  const handleChange = (e) => {
    console.log("Selected value: ", e.target.value); // Debug log
    onChange("FieldofInterest", e.target.value); // Pass both the field name and the value to the parent
  };

  return (
    <div className="flex flex-col py-1">
      {readOnly ? (
        <div className="block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md text-gray-700 cursor-default">
          {value || "Not Selected"}
        </div>
      ) : (
        <select
          id="FieldofInterest"
          name="FieldofInterest"
          onChange={handleChange}
          value={value}
          className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        >
          <option value="" disabled>
            Select Your Interest
          </option>
          <option value="Core">Core</option>
          <option value="IT">IT</option>
        </select>
      )}
    </div>
  );
}
