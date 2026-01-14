"use client";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import DropDown from "../ui/Dropdown";
import Button from "../ui/Button";
import Link from "next/link";

export const navList = [
  { nav: "Home", href: "/" },
  { nav: "Doctors", href: "/doctors" },
];

const Header = () => {
  const [isScroll, setIsScroll] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (current) => {
    setIsScroll((prev) => {
      const next = current > 60;
      console.log(prev !== next);
      return prev !== next ? next : prev;
    });
  });
  return (
    <header
      className={`fixed z-40 top-0 left-1/2 pt-3 w-full -translate-x-1/2 transition-all duration-300  flex justify-between items-center ${
        isScroll
          ? "  pb-3 px-12 bg-cyan-900 rounded-b-xl shadow-lg  text-white"
          : "    px-7 bg-transparent text-cyan-900"
      }`}
    >
      <Link href={"/"} className="logo font-bold text-2xl cursor-pointer">CareHub</Link>
      <ul className="hidden md:flex justify-between gap-10">
        {navList.map((el, index) => {
          return (
            <li key={index}>
              <a
                href={el.href}
                className={
                  "font-medium text-sm  lg:text-base hover:text-amber-500 transition whitespace-nowrap"
                }
              >
                {el.nav}
              </a>
            </li>
          );
        })}
      </ul>
      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button
          href="/auth/register"
          size = "samll"
          type= "secondary"
          isScroll= {isScroll}
        >
          Sign Up
        </Button>
        <DropDown isScroll={isScroll} />
      </div>
    </header>
  );
};

export default Header;
