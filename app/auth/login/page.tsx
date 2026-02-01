"use client"
import Login from "../../components/auth/Login";
import Image from "next/image";

const page = () => {
  return (
    <div className="min-w-full  h-screen flex justify-center items-center bg-black/5">
      <div className="shadow-xl w-8/10 md:w-fit shadow-cyan-700/20 flex justify-center  items-stretch overflow-hidden rounded-2xl">
        <Image
          src={"/register3.jpg"}
          width={250}
          height={400}
          alt={"doctors"}
          className="hidden md:block"
        />
        <div className="flex flex-col px-7 md:px-10 py-5 justify-stretch items-center bg-white w-full md:w-[400px]">
          <Login />
          <p  onClick={()=>location.replace("/auth/register")} className="text-gray-500 text-sm"> {`Don't have an account`} <span className="text-blue-400 underline cursor-pointer">Sign up</span> </p>
        </div>
      </div>
    </div>
  );
};

export default page;
