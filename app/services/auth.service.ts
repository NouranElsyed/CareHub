"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { api } from "../lib/api";
import { ILoginForm, ISignupForm } from "../types";

export const SignUp = async (
  e: FormEvent<HTMLFormElement>,
  setIsLoading: (load: boolean) => void,
  formsValue: ISignupForm,
  router: ReturnType<typeof useRouter>
) => {
  setIsLoading(true);
  e.preventDefault();
  try {
    const res = await api.post("/auth/register", formsValue);
    if (res.status === 201) {
      if (typeof window !== "undefined") {
        localStorage.setItem("toastMsg", res.data.message);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      router.push("/");
    }
  } catch (er) {
    console.log(er);
  } finally {
    setIsLoading(false);
  }
};

export const Login = async (
  e: FormEvent<HTMLFormElement>,
  setIsLoading: (load: boolean) => void,
  formsValue: ILoginForm,
  router: ReturnType<typeof useRouter>
) => {
  setIsLoading(true);
  e.preventDefault();
  try {
    const res = await api.post("/auth/signin", formsValue);
    if (res.status === 200) {
      if (typeof window !== "undefined") {
        localStorage.setItem("toastMsg", res.data.message);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      router.push("/");
    }
  } catch (er) {
    console.log(er);
  } finally {
    setIsLoading(false);
  }
};
