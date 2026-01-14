import Link from "next/link";
import { ReactNode } from "react";

const Button = ({
  href,
  children,
  type,
  size,
  isScroll
}: {
  children: ReactNode;
  type: "primary" | "secondary";
  size: "large" | "samll";
  href: string;
  isScroll?:boolean
}) => {
  {
    /* 
        Primary:
          fall color :cyan-600
          hover : :bg-amber-500
        secondary:  
          fall color: transparent
          border: 
          hover : amber-600
        ///////////////////////////////
        size {
        large:  px-6 py-3 rounded-xl
        medium: .....
        samll:  px-2 py-2 rounded-lg  text-sm
        }
        */
  }
  return (
    <Link
      href={href}
      className={` lg:px-5 rounded-lg whitespace-nowrap font-medium  transition duration-400 
          ${
            type === "primary"
              ? "bg-cyan-800 hover:bg-cyan-700"
              :` bg-transparent border-2  hover:bg-amber-600 hover:border-amber-600 hover:text-white ${isScroll ? "border-gray-200/70 text-white": "  border-amber-600/70   text-amber-600 "} `}
          
          ${
            (size === "large" && " px-6 py-3 rounded-xl  text-base") ||
            (size === "samll" && " px-3 py-2 rounded-lg  text-sm")
          }
             `}
    >
      {children}
    </Link>
  );
};

export default Button;
