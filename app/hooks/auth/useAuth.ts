"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ISignupForm, ILoginForm } from "../../types";
import { registerUser, loginUser } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { login } from "@/app/store/features/authSlice";

export const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const signup = async (formsValue: ISignupForm) => {
    setIsLoading(true);
    try {
      const data = await registerUser(formsValue);

      dispatch(login(data.user));
      if (typeof window !== "undefined") {
        localStorage.setItem("toastMsg", data.message);
      }

      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const Login = async (formsValue: ILoginForm) => {
    setIsLoading(true);
    try {
      const data = await loginUser(formsValue);
      dispatch(login(data.user));

      if (typeof window !== "undefined") {
        localStorage.setItem("toastMsg", data.message);
      }

      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, Login, isLoading };
};
