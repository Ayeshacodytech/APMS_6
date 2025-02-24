import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export function PasswordBox({ placeholder, onChange }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="py-1">
      <div className="relative">
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full pl-4 px-1 py-2 border rounded border-slate-200 bg-slate-300 text-black"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          onClick={togglePasswordVisibility}
        >
          <FontAwesomeIcon
            icon={passwordVisible ? faEyeSlash : faEye}
            className="text-slate-400"
          />
        </button>
      </div>
    </div>
  );
}
