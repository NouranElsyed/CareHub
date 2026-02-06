"use client";
import { useGetSpecialitie } from "@/app/hooks/department/useGetDep";
import { useDoctor } from "@/app/hooks/doctors/useGetDoctors";
import { useState } from "react";
import { IDoctor } from "../../types/index";
import Button from "../ui/Button";
import Image from "next/image";
import Loading from "../ui/Loading";
import { useDispatch } from "react-redux";
import { setShowedDoctor } from "@/app/store/features/doctorSlice";
// import DoctorModal from "./DoctorModal";

const Doctors = () => {
  const [specialitie, setSpecialitie] = useState("all");

  const { data: specialties = [], isLoading: isSpecialtiesLoading } =
    useGetSpecialitie();
  const { data: Doctors = [], isLoading: isDoctorsLoading } =
    useDoctor().GetDoctors(specialitie);
  console.log(Doctors);
  const specialization = ["all", ...specialties];
const dispatch = useDispatch();
  if (isSpecialtiesLoading && isDoctorsLoading) return <Loading />;
  return (
    <div className="w-9/10 mx-auto relative">

      <div className="flex flex-col">
        <h4 className="text-4xl font-semibold mb-5 text-cyan-900">
          Find Your <span className="text-amber-500">Doctor</span>
        </h4>
        <div className="flex gap-5 text-lg my-3  flex-wrap">
          {(isSpecialtiesLoading && <Loading />) ||
            specialization.map((specialtie: string, index: number) => {
              return (
                <button
                  type="button"
                  key={index}
                  className={`border border-amber-600/60 rounded-2xl
                     hover:bg-amber-600 hover:text-white text-cyan-900 px-3 py-1 
                     whitespace-nowrap transition-all duration-500 cursor-pointer
                     ${specialtie === specialitie && "bg-amber-600 text-white"}
                     `}
                  onClick={(e) => {
                    const value = (e.target as HTMLElement).textContent;
                    setSpecialitie(value.trim());
                    console.log(value);
                  }}
                >
                  {specialtie}
                </button>
              );
            })}
        </div>
      </div>
      {/* {openCard && <DoctorModal  isOpen={true} />} */}

      <div className="grid grid-cols-1   mx-auto  w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 my-7">

        {(isDoctorsLoading && <Loading />) ||
          Doctors.map((doctor: IDoctor, index: number) => {
            return (
              <div
                key={index}
                className=" h-min-[350]  bg-gray-600/5 hover:shadow-lg shadow-amber-500/50 hover:scale-105 transition-all duration-500 border border-amber-600/60 rounded-2xl flex flex-col justify-between items-center md:items-start px-5"
              >
               
                <div className="flex flex-col justify-start items-start w-full">
                  <div className="relative  w-[150] h-[150] border self-center mb-5 border-amber-600/60 rounded-full overflow-hidden mt-5">
                    <Image
                      alt={"doctor photo"}
                      src={doctor.user.image}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-cyan-900  font-medium ">
                    <span className="text-amber-500  font-semibold text-lg">
                      Doctor:{" "}
                    </span>
                    {doctor.user.name}
                  </h2>
                  <span className="text-cyan-900  font-medium">
                    <span className="text-amber-500 font-semibold text-lg">
                      price:{" "}
                    </span>
                    {doctor.price}{" "}
                    <span className="text-amber-500 font-semibold text-lg">
                      $
                    </span>
                  </span>
                  <span className="text-cyan-900 ">
                    <span className="text-amber-500 font-semibold text-lg">
                      specialization:{" "}
                    </span>
                    {doctor.specialization}
                  </span>
                </div>
                <div className="flex flex-col gap-3 justify-center mt-5 px-2 w-full text-center my-5">
                  <Button
                    onClick={() => {

                      dispatch(setShowedDoctor({doctor, isModalOpen:true}))
                    }}
                    size="small"
                    kind="primary"
                  >
                    profile
                  </Button>
                  <Button href={`/doctors/${doctor._id}`} size="small" kind="secondary">
                    book appoitment
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Doctors;
