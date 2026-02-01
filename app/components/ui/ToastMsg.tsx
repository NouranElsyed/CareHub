"use client"
import toast from "react-hot-toast";

const ToastMsg = () => {
      const toastMsg = localStorage.getItem("toastMsg")
  if(toastMsg){
            toast.success(toastMsg, {
          duration: 6000,
          position: "top-center",

          // Styling
          style: {},
          className: "",

          // Custom Icon
          icon: "🎉",

          // Additional Configuration
          removeDelay: 1000,
        });
     localStorage.removeItem("toastMsg")

  }
  return (
   <></>
  )
}

export default ToastMsg