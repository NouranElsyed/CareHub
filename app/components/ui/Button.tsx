import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  kind: "primary" | "secondary";
  size: "large" | "small";
  href?: string;
  isScroll?: boolean;
  className?: string;
  click?: () => void; // for link element;
  disable?: boolean;
}
const Button = ({
  href,
  children,
  kind,
  size,
  isScroll,
  className,
  click,
  disable,
  ...props
}: IButton) => {
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

  const classes = `px-2 lg:px-3 py-1 rounded-lg whitespace-nowrap font-medium  transition duration-180 ${className} ${disable ? "cursor-not-allowed":" cursor-pointer"}
          ${
            kind === "primary"
              ? `bg-cyan-800 text-white ${disable ? "bg-cyan-800/30 " : "hover:bg-cyan-600 "}`
              : ` bg-transparent border-2 ${disable ? "" : " hover:bg-amber-600 hover:border-amber-600 hover:text-white"} ${
                  isScroll
                    ? `border-gray-200/70 text-white  `
                    : `  border-amber-600/70   text-amber-600 `
                } `
          }
          
          ${
            (size === "large" && " px-6 py-3 rounded-xl  text-base") ||
            (size === "small" && " px-3 py-2 rounded-lg  text-sm")
          }
             `;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={click}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props} disabled={disable}>
      {children}
    </button>
  );
};

export default Button;
