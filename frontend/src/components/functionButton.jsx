export function FunctionButton({ label, onClick, disabled }) {
    return (
        <button
            type="button"
            className="mt-6 w-full pl-4 px-1 py-2.5 border-md font-medium rounded-lg text-sm bg-gradient-to-b from-white to-[#3074f4]"
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
}