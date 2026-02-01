import Image from "next/image";
import Button from "../ui/Button";
import ToastMsg from "../ui/ToastMsg";

const Hero = () => {

  return (
    <section className="md:h-screen w-9/10  mx-auto flex flex-col gap-5 md:flex-row justify-center items-center">
      <ToastMsg/>
      <div className="w-full md:w-1/2 mb-10 mt-30 md:mt-0 text-center md:text-left">
        <h1 className="font-bold text-4xl md:text-5xl text-cyan-900  mb-5">
          <span className="text-amber-500 ">CareHub</span> Medical Center
        </h1>
        <p className="text-gray-500/90">
          Comprehensive healthcare with expert doctors across multiple
          specialties all in one place.
        </p>
        <div className="flex gap-4 justify-center md:justify-start pt-10 text-white">
          <Button href="/doctors" kind="primary" size="large">
            Book Appointment
          </Button>
          <Button href="/auth/signin" kind="secondary" size="large">
            Doctor Login
          </Button>
        </div>
      </div>
      <div className=" md:w-1/2 flex items-center pt-20 justify-center overflow-hidden rounded-4xl relative">
        <Image
          alt="two doctors avatar"
          width={500}
          height={600}
          className="object-cover"
          src="/herro.png"
        ></Image>
      </div>
    </section>
  );
};

export default Hero;
