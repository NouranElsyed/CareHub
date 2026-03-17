"use client";
import { FormEvent, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { RotatingLines } from "react-loader-spinner";
import { ILoginForm } from "@/app/types";
import { useAuth } from "@/app/hooks/auth/useAuth";

const Signin = () => {
  const { Login, isLoading } = useAuth();

  const [formsValue, setFormsValue] = useState<ILoginForm>({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Login(formsValue); 
  };

  return (
    <form className="h-full w-9/10 mx-auto" onSubmit={handleSubmit}>
      <h4 className="font-medium text-cyan-900 text-2xl my-5">Log in</h4>

      <Input
        label="Email"
        type="email"
        value={formsValue.email}
        onChange={(e) =>
          setFormsValue((prev) => ({ ...prev, email: e.target.value }))
        }
      />

      <Input
        label="Password"
        type="password"
        value={formsValue.password}
        onChange={(e) =>
          setFormsValue((prev) => ({ ...prev, password: e.target.value }))
        }
      />

      <Button
        kind="primary"
        size="small"
        type="submit"
        disabled={isLoading}
        className={`my-5  w-fit mx-auto flex items-center gap-2 ${isLoading ? "cursor-not-allowed bg-[#4a7581c6]" : ""}`}
      >
        {isLoading && (
          <RotatingLines
            visible={true}
            height="15"
            width="15"
            color="#fff"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        )}
        Submit
      </Button>
    </form>
  );
};

export default Signin;
