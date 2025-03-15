
export function InputBox({ type, name, placeholder, value, onChange, required }) {
  return (
      <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full pl-4 px-1 py-2 border rounded border-slate-200 bg-slate-300 text-black"
      />
  );
}
