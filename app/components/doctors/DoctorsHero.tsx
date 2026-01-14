import Image from "next/image"


const DoctorsHero = () => {

  return (
    <div className=" w-9/10 mx-auto flex flex-col md:mt-20 mt-35 lg:mt-15 md:flex-row justify-center md:justify-start  items-center ">
      <div className="flex flex-col">
        <h3 className="text-4xl font-bold md:text-4xl mb-6 text-cyan-900">
          Expert Care You Can <span className="text-amber-500"> Trust</span>
        </h3>
        <p className="text-sm text-gray-500/90">
          Our clinic brings together a team of highly qualified doctors across
          all medical specialties, working together to give you accurate
          diagnosis, personalized treatment, and compassionate care
        </p>
      </div>
     <div >
      <Image alt={"clinic picture"} width={600} height={600} src={'/pickDoctor2.png'} className="my-15"></Image>
     </div>
    </div>
  );
};

export default DoctorsHero;
