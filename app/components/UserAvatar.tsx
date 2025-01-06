"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

interface UserAvatarProps {
  src?: string;
  fallback?: string;
  hasNotification?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function UserAvatar({
  src,
  fallback = "U",
  hasNotification = false,
  size = "md",
  className,
}: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <div className="relative">
      <div className="inline-block">
        <Link href="/profile">
          <Avatar className={`${sizeClasses[size]} cursor-pointer ${className || ""}`}>
            <AvatarImage src={src} alt="User avatar" />
            <AvatarFallback className="bg-gray-100 text-gray-600">
              {fallback}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
      {hasNotification && (
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 border-2 border-white" />
      )}
    </div>
  );
} 