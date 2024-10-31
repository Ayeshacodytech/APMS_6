export function InputBox({ placeholder, onChange }) {
  return (
    <div className="py-1">
      <input
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-4 px-1 py-2 border rounded border-slate-200 bg-custom-gray text-black"
      />
    </div>
  );
}
