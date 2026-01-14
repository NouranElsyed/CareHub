import DoctorsHero from "../components/doctors/DoctorsHero";
import Doctors from "../components/doctors/Doctors";

const page = () => {
  return (
    <section className=" flex text-white flex-col">
      <DoctorsHero/>
      <Doctors/>
    </section>
  );
};

export default page;
