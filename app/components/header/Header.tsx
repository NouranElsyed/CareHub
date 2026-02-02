"use client";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState, useEffect } from "react";
import DropDown from "../ui/Dropdown";
import Button from "../ui/Button";
import Link from "next/link";
import { Stethoscope } from "lucide-react";
import { usePathname } from "next/navigation";

export const navList = [
  { nav: "Home", href: "/" },
  { nav: "Doctors", href: "/doctors" },
];

const Header = () => {
  const pathname = usePathname();

  const [logined, setLogined] = useState(null);
  const [signupPage, setSignupPage] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setLogined(JSON.parse(user));
  }, []);

  useEffect(() => {
    setSignupPage(pathname === "/auth/register");
  }, [pathname]);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (current) => {
    setIsScroll((prev) => {
      const next = current > 60;
      return prev !== next ? next : prev;
    });
  });

  return (
    <header
      className={`fixed z-40 top-0 left-1/2 pt-3 w-full -translate-x-1/2 transition-all duration-300 flex justify-between items-center ${
        isScroll
          ? "pb-3 px-12 bg-cyan-900 rounded-b-xl shadow-lg text-white"
          : "px-7 bg-transparent text-cyan-900"
      }`}
    >
      <Link href="/" className="logo font-bold text-2xl flex items-center">
        <div className="me-2 rounded-lg bg-cyan-500 text-white p-2">
          <Stethoscope size={22} strokeWidth={3} />
        </div>
        Care <span className="text-cyan-500">Hub</span>
      </Link>

      <ul className="hidden md:flex gap-10">
        {navList.map((el, index) => (
          <li key={index}>
            <Link
              href={el.href}
              className="font-medium text-sm lg:text-base hover:text-amber-500 transition whitespace-nowrap"
            >
              {el.nav}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {!logined && (
          <Button
            href={signupPage ? "/auth/login" : "/auth/register"}
            size="small"
            kind="secondary"
            isScroll={isScroll}
          >
            {signupPage ? "Sign in" : "Sign Up"}
          </Button>
        )}

        <DropDown isScroll={isScroll} />
      </div>
    </header>
  );
};

export default Header;
