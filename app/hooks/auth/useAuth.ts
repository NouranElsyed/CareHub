"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ISignupForm, ILoginForm } from "../../types";
import { registerUser, loginUser } from "../../services/auth.service";

export const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (formsValue: ISignupForm) => {
    setIsLoading(true);
    try {
      const data = await registerUser(formsValue);

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("toastMsg", data.message);
      }

      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (formsValue: ILoginForm) => {
    setIsLoading(true);
    try {
      const data = await loginUser(formsValue);

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("toastMsg", data.message);
      }

      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, login, isLoading };
};
