"use client";

import React from "react";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import useScroll from "@/hooks/UseScrool";
import { cn } from "@/utils/utils";

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all bg-zinc-100`,
        {
          // "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-zinc-100": selectedLayout,
        }
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            {/* eslint-disable @next/next/no-img-element */}
            <img
              className="navbar-brand-img"
              src="/sevenmates/sevenmates-dashboard-navbar.png"
              width={160}
              height={82}
              alt="Logo"
            />
          </Link>
        </div>

        {/* <div className="hidden md:block">
          <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
            <span className="font-semibold text-sm">HQ</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
