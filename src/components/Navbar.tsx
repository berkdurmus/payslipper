import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  let navigate = useNavigate();

  return (
    <button
      className="flex flex-row items-center mb-4"
      onClick={() => navigate(-1)}
    >
      <svg
        fill="#6366F1"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g data-name="arrow-ios-purple">
          <rect
            width="24"
            height="24"
            transform="rotate(90 12 12)"
            opacity="0"
          />
          <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z" />
        </g>
      </svg>
      <h2 className="text-m font-semibold text-indigo-500">Back</h2>
    </button>
  );
};

export default Navbar;
