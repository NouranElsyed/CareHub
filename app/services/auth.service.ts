"use client"
import { FormEvent } from "react";
import { api } from "../lib/api";
import { ILoginForm, ISignupForm } from "../types";

export const SignUp = async (e: FormEvent<HTMLFormElement>,setIsLoading:(load:boolean)=>void,formsValue:ISignupForm) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", formsValue);
      console.log(res);
      if (res.status === 201) {
        location.replace("/");
        localStorage.setItem("toastMsg", res.data.message);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (er) {
      console.log(er);
    } finally {
      setIsLoading(false);
    }
  };

  export const Login = async (e: FormEvent<HTMLFormElement>,setIsLoading:(load:boolean)=>void,formsValue:ILoginForm) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await api.post("/auth/signin", formsValue);
      console.log(res);
      if (res.status === 200) {
        location.replace("/");
        localStorage.setItem("toastMsg", res.data.message);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (er) {
      console.log(er);
    } finally {
      setIsLoading(false);
    }
  };