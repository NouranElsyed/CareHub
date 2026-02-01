"use client";
import { FormEvent, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { RotatingLines } from "react-loader-spinner";
import { Login } from "@/app/services/auth.service";
import { ILoginForm } from "@/app/types";

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formsValue, setFormsValue] = useState<ILoginForm>({
    email: "",
    password: "",
  });
  return (
    <form
      className="h-full  w-9/10"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        Login(e, setIsLoading, formsValue)
      }
    >
      <h4 className="font-medium text-cyan-900 text-2xl my-5">Log in</h4>
      <Input
        label="Email"
        type={"email"}
        onChange={(e) => {
          console.log(e.target.value);
          setFormsValue((prev) => ({ ...prev, email: e.target.value }));
        }}
      />
      <Input
        label="Password"
        type={"password"}
        onChange={(e) => {
          console.log(e.target.value);
          setFormsValue((prev) => ({ ...prev, password: e.target.value }));
        }}
      />
      <Button
        kind="primary"
        size="small"
        className={` my-5 block w-fit mx-auto ${isLoading && "cursor-not-allowed  bg-[#4a7581c6]"} flex items-center gap-2`}
        type="submit"
        disabled={isLoading}
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
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
        submit
      </Button>
    </form>
  );
};

export default Signin;
