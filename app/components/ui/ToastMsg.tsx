"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ToastMsg = () => {
  useEffect(() => {
    const toastMsg = localStorage.getItem("toastMsg");

    if (toastMsg) {
      toast.success(toastMsg, {
        duration: 6000,
        position: "top-center",
        icon: "🎉",
        removeDelay: 1000,
      });

      localStorage.removeItem("toastMsg");
    }
  }, []);

  return null;
};

export default ToastMsg;
