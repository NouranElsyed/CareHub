// "use client" مش محتاج هنا لأن دي pure functions
import { api } from "../lib/api";
import { ISignupForm, ILoginForm } from "../types";

export const registerUser = async (formsValue: ISignupForm) => {
  const res = await api.post("/auth/register", formsValue);
  return res.data; // { user, message, token }
};

export const loginUser = async (formsValue: ILoginForm) => {
  const res = await api.post("/auth/signin", formsValue);
  return res.data; // { user, message, token }
};
