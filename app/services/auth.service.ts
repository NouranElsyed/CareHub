
import { api } from "../lib/api";
import { ISignupForm, ILoginForm } from "../types";

export const registerUser = async (formsValue: ISignupForm) => {
  const res = await api.post("/auth/register", formsValue);
  return res.data;
};

export const loginUser = async (formsValue: ILoginForm) => {
  const res = await api.post("/auth/signin", formsValue);
  return res.data;
};
export const restoreSession = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
