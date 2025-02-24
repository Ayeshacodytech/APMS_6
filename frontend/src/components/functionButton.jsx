export function FunctionButton({ label, onClick, disabled }) {
  return (
    <button
      type="button"
      className="mt-6 w-full pl-4 px-1 py-2.5 border-md font-medium rounded-lg text-sm bg-gradient-to-l from-[#a935fd] via-[#6f5eff] to-[#35fdf5]"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
