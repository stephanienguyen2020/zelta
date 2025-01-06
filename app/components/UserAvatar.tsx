"use client";

import { Avatar, AvatarImage } from "@/app/components/ui/avatar";
import Link from "next/link";

interface UserAvatarProps {
  src: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function UserAvatar({
  src,
  size = "md",
  className,
}: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <Link href="/profile" className="block">
      <Avatar className={`${sizeClasses[size]} cursor-pointer ${className || ""}`}>
        <AvatarImage 
          src={src} 
          alt="User avatar"
          className="object-cover"
        />
      </Avatar>
    </Link>
  );
} 