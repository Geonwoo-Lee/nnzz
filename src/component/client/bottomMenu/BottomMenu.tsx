"use client";
import { CSSProperties, useMemo } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";


import Home from '@/src/svg/bottomMenu/Home'
import Feed from '@/src/svg/bottomMenu/Feed'
import Random from '@/src/svg/bottomMenu/Random'

const BottomMenu = () => {
  const pathname = usePathname();

  const bottomMenuItems = useMemo(
    () => [
      {
        name: "홈",
        value: "/home",
        icon: (
          <Home
            className={pathname === "/home" ? "animate-scale2" : ""}
            style={{
              "--fill-color": pathname === "/home" ? "rgba(31, 41, 55, 1)" : "#D1D5DB"
            } as CSSProperties}
          />
        ),
      },
      {
        name: "랜덤 뽑기",
        value: "/meal-tarot",
        icon: (
          <Random
            className={pathname === "/meal-tarot" ? "animate-scale2" : ""}
            style={{
              "--fill-color": pathname === "/meal-tarot" ? "rgba(31, 41, 55, 1)" : "#D1D5DB"
            } as CSSProperties}
          />
        ),
      },
      {
        name: "피드",
        value: "/blog/list",
        icon: (
          <Feed
            className={pathname.startsWith("/blog") ? "animate-scale2" : ""}
            style={{
              "--fill-color": pathname.startsWith("/blog") ? "rgba(31, 41, 55, 1)" : "#D1D5DB"
            } as CSSProperties}
          />
        ),
      },
    ],
    [pathname],
  );

  return (
    <nav className="w-full max-w-[640px] pt-2 shadow-top bg-static-white px-5  border-t border-state-base-border  footer fixed bottom-0 z-40 flex flex-row h-bottom-menu-height ">
      {bottomMenuItems.map((item, index) => (
        <Link
          href={item.value}
          key={`bottom-menu-icons-${index} `}
          className="w-full flex flex-col gap-0 flex-grow pb-[14px] bg-alpha-00 flex-grow-1 items-center  justify-center h-bottom-menu-height "
        >
          {item.icon}
          <div
            className={`text-xs font-medium flex flex-col ${pathname.startsWith(item.value.slice(0, 4)) ? "text-gray-800" : "text-[#D1D5DB]"}`}
          >
            {item.name}
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default BottomMenu;
