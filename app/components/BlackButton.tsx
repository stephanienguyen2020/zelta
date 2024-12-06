"use client";
import { useState } from "react";

interface BlackButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function BlackButton({ onClick, children }: BlackButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      className={`
        inline-block px-6 py-2.5 
        bg-black text-white rounded-full
        hover:bg-gray-800 transition-all duration-300
        text-lg
        ${isHovered ? "transform scale-105" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={`transition-transform duration-300 ${
          isHovered ? "transform -translate-x-1" : ""
        }`}
      >
        {children}
      </span>
    </button>
  );
}
