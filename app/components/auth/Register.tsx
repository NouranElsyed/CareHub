"use client";
import { FormEvent, useState } from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import { ISignupForm } from "@/app/types";

const Register = () => {
  const { signup, isLoading } = useAuth();
  const [formsValue, setFormsValue] = useState<ISignupForm>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(formsValue);
  };

  return (
    <form onSubmit={handleSubmit} className="w-9/10 mx-auto">
      <h4>Create account</h4>
      <input
        type="text"
        placeholder="Name"
        value={formsValue.name}
        onChange={(e) => setFormsValue({ ...formsValue, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formsValue.email}
        onChange={(e) => setFormsValue({ ...formsValue, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formsValue.password}
        onChange={(e) => setFormsValue({ ...formsValue, password: e.target.value })}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Register"}
      </button>
    </form>
  );
};

export default Register;
