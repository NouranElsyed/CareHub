"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";
interface IProps {
  children: ReactNode;
  initial: { opacity: number; y: number };
  whileInView: { opacity: number; y: number };
  transition: { duration: number, delay?: number };
  viewport: { once: boolean };
  className?:string
}
const Motion = ({
  children,
  initial,
  whileInView,
  transition,
  viewport,
  className
}: IProps) => {
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      transition={transition}
      viewport={viewport}
      className={`${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Motion;
