export const EditableInputbox = ({ value, onChange, readOnly, name }) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(name, e.target.value); // Pass name and value to the parent
        }
    };

    return (
        <div className="py-1">
            {readOnly ? (
                <div className="block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md text-gray-700 cursor-default">
                    {value || " "}
                </div>
            ) : (
                <div>
                    <input
                        className="w-full pl-4 px-1 py-2 border bg-gray-100 rounded border-slate-200 bg-custom-gray text-black"
                        type="text"
                        value={value || ''}
                        onChange={handleChange}
                        style={{ cursor: readOnly ? 'text' : 'pointer' }}
                    />
                </div>
            )}
        </div>
    );
};
