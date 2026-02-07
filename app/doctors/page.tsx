"use client";
import DoctorsHero from "../components/doctors/DoctorsHero";
import Doctors from "../components/doctors/Doctors";
import DoctorModal from "../components/doctors/DoctorModal";

const page = () => {
  return (
    <section className=" flex text-white flex-col relative">
      <DoctorsHero />
      <Doctors />
      <DoctorModal modal={true} />
    </section>
  );
};

export default page;
