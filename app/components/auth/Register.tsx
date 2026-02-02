"use client";

import { FormEvent, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { RotatingLines } from "react-loader-spinner";
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
    <form className="h-full w-9/10" onSubmit={handleSubmit}>
      <h4 className="font-medium text-cyan-900 text-2xl my-5">
        Create account
      </h4>

      <Input
        label="Name"
        type="text"
        onChange={(e) =>
          setFormsValue((prev) => ({ ...prev, name: e.target.value }))
        }
      />

      <Input
        label="Email"
        type="email"
        onChange={(e) =>
          setFormsValue((prev) => ({ ...prev, email: e.target.value }))
        }
      />

      <Input
        label="Password"
        type="password"
        onChange={(e) =>
          setFormsValue((prev) => ({ ...prev, password: e.target.value }))
        }
      />

      <Button
        kind="primary"
        size="small"
        className={`my-5 mx-auto flex w-fit items-center gap-2 ${
          isLoading && "cursor-not-allowed bg-[#4a7581c6]"
        }`}
        type="submit"
        disabled={isLoading}
      >
        {isLoading && (
          <RotatingLines
            visible
            height="15"
            width="15"
            color="#fff"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="loading"
          />
        )}
        Submit
      </Button>
    </form>
  );
};

export default Register;
