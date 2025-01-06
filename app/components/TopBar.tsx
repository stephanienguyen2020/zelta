"use client";

import React from 'react';
import { UserAvatar } from "@/app/components/UserAvatar";
import Logo from "@/app/components/Logo";

export function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        <UserAvatar 
          src="/images/Stephanie.jpg" 
          size="md"
        />
      </div>
    </div>
  );
} 