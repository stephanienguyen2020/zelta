"use client";

import { Save } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface SaveButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export function SaveButton({ onClick, disabled = false, className = "" }: SaveButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="default"
      size="icon"
      className={`h-8 w-8 bg-black hover:bg-gray-800 ${className}`}
      disabled={disabled}
    >
      <Save className="h-4 w-4 text-white" />
    </Button>
  );
} 