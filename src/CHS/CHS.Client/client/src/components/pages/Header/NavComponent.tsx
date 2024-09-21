"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  normalMenuItems,
  loginRegisterMenuItems,
  profileMenuItems,
} from "@/lib/utils/menuItems";
import { useSession } from "@/lib/utils/session";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const { session } = useSession();
  const [currentSession, setCurrentSession] = useState(session);

  useEffect(() => {
    setCurrentSession(session);
  }, [session]);

  return (
    <nav className="justify-between w-full flex-row hidden md:flex">
      <ul className="w-full hidden justify-center flex-row md:flex relative">
        <ul className="flex justify-center gap-3 flex-row absolute">
          {normalMenuItems.map((item, index) => (
            <li key={index}>
              <Button
                asChild
                size={"lg"}
                className={` ${
                  pathname === item.path
                    ? "border-b-4 border-b-slate-400 dark:border-b-slate-400 "
                    : ""
                }`}
              >
                <Link href={item.path}>{item.name}</Link>
              </Button>
            </li>
          ))}
        </ul>
        {!currentSession && (
          <ul className="flex gap-3 justify-end items-end flex-grow">
            {loginRegisterMenuItems.map((item: any, index: any) => (
              <li key={index}>
                <Button
                  asChild
                  size={"lg"}
                  className={` ${
                    pathname === item.path
                      ? "border-b-4 border-b-slate-400 dark:border-b-slate-400 "
                      : ""
                  }`}
                >
                  <Link href={item.path}>{item.name}</Link>
                </Button>
              </li>
            ))}
          </ul>
        )}
        {currentSession && (
          <ul className="flex gap-3 justify-end items-end flex-grow">
            {profileMenuItems.map((item: any, index: any) => (
              <li key={index}>
                <Button
                  asChild
                  size={"lg"}
                  className={` ${
                    pathname === item.path
                      ? "border-b-4 border-b-slate-400 dark:border-b-slate-400 "
                      : ""
                  }`}
                >
                  <Link href={item.path}>{item.name}</Link>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </ul>
    </nav>
  );
}
