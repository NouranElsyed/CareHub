"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useDoctor } from "@/app/hooks/doctors/useGetDoctors";
import Loading from "@/app/components/ui/Loading";
import {
  Calendar,
  CircleCheckBig,
  Clock2,
  Mail,
  MapPin,
  Phone,
  Star,
  Stethoscope,
} from "lucide-react";
import { ReactNode, useState } from "react";
import Button from "@/app/components/ui/Button";
import { daysOfWeek } from "@/app/types";
import { useAppoitment } from "@/app/hooks/appoiment/useAppoiment";

const doctorInfo: {
  datatitle: string;
  icon: ReactNode;
  data: string;
  bgColor: string;
  iconColor: string;
}[] = [
  {
    datatitle: "Phone",
    icon: <Phone />,
    data: "01234567890",
    bgColor: "bg-cyan-300/30",
    iconColor: "text-cyan-700",
  },
  {
    datatitle: "Email",
    icon: <Mail />,
    data: "doctor@gmail.com",
    bgColor: "bg-emerald-300/30 ",
    iconColor: "text-emerald-700",
  },
  {
    datatitle: "Location",
    icon: <MapPin />,
    data: "Main clinic",
    bgColor: "bg-fuchsia-300/30",
    iconColor: "text-fuchsia-700",
  },
  {
    datatitle: "Consultation duration",
    icon: <Clock2 />,
    data: "30 mins",
    bgColor: "bg-amber-300/30",
    iconColor: "text-amber-700",
  },
];

const DoctorProfile = () => {
  const { id } = useParams();
  const doctorId = id?.toString();
  const { data, isLoading, isError, isSuccess } = useDoctor().GetDoctor(
    doctorId!,
  );
  const [day, setDay] = useState<number|null>();
  const [date, setDate] = useState<string>("");
  const {data:checkAppoit} = useAppoitment().GetDoctorAppoitment(doctorId!,day!,date);
  if (isLoading) {
    return <Loading />;
  }
  if (isError || !isSuccess) {
    return (
      <div className="w-9/10 mx-auto h-[500px] flex justify-center items-center text-5xl rounded-4xl">
        Failed
      </div>
    );
  }

  return (
    <div className="w-9/10 mx-auto min-h-screen flex flex-col md:flex-row items-stretch justify-center py-30 gap-5">
      <div className="flex flex-col items-center lg:flex-row lg:items-start pt-15 bg-white shadow-xl shadow-gray-700/20 p-5 gap-5 rounded-3xl w-full lg:w-2/3">
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="rounded-2xl overflow-hidden w-full h-[180px] relative self-start  shadow-xl shadow-gray-700/20">
            <Image
              src={data.doctor?.user?.image}
              fill
              alt="doctor image"
              className="object-cover object-center origin-center"
            />
          </div>

          <p className="bg-amber-200/30 rounded-lg px-4 py-1 text-[#ffd000e2] flex gap-2 items-center justify-center w-full">
            <div className="flex ">
              <Star fill="#ffd000e2" size={15} />{" "}
              <Star fill="#ffd000e2" size={15} />{" "}
              <Star fill="#ffd000e2" size={15} />{" "}
              <Star fill="#ffd000e2" size={15} />
            </div>
            <span className="text-black font-medium">4</span>
            <span className="text-gray-500 text-xs whitespace-nowrap">
              (120 Rating)
            </span>
          </p>
        </div>

        <div className="flex flex-col items-center lg:items-start  justify-start ">
          <h3 className="text-cyan-900  font-semibold mb-2 text-2xl">
            <span className="text-amber-500  font-bold ">Dr. </span>
            {data.doctor?.user?.name}
          </h3>
          <span className="flex gap-3 items-center bg-cyan-200/30 px-4 py-1 rounded-2xl text-cyan-800 font-semibold">
            <Stethoscope size={18} /> <span>{data.doctor?.specialization}</span>
          </span>
          <p className=" text-gray-700/70 text-center lg:text-start w-2/3 lg:w-full text-sm my-3">{`Experienced cardiologist providing accurate diagnosis.
Committed to trusted and patient-centered care.`}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 w-full gap-5">
            {doctorInfo.map((info) => {
              return (
                <div
                  key={info.datatitle}
                  className="bg-gray-200/30 rounded-2xl p-3 flex gap-2 items-center"
                >
                  <div
                    className={`${info.bgColor} rounded-lg p-2 ${info.iconColor}`}
                  >
                    {info.icon}
                  </div>
                  <div className="text-sm">
                    <h5 className="text-gray-600">{info.datatitle}</h5>
                    <span className="text-base font-medium">{info.data}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/3 p-5  rounded-2xl h-full bg-white shadow-xl shadow-gray-700/20 flex flex-col gap-5">
        <h5 className="text-xl font-semibold text-black">Book appoitment</h5>
        <div className="bg-cyan-200/15 rounded-2xl px-4 py-5 ">
          <div className="flex flex-col">
            <h5 className="text-gray-600 text-sm">Consultation price</h5>
            <div className="flex justify-between items-center">
              <span className="text-black font-bold text-3xl ">
                {data.doctor?.price} <span className="text-sm">EG</span>
              </span>
              <div className="text-cyan-800">
                {" "}
                <CircleCheckBig />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="text-cyan-600 flex items-center gap-2">
            <Calendar />
            <span className="text-lg font-medium text-black">Choose Day</span>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {data?.doctor?.availableSlots?.map(
            (slot: {
              day: number;
              from: string;
              to: string;
              duration: number;
              limitPatients: number;
              _id: string;
            }) => (
              <div
                key={slot._id}
                className={`border border-gray-500/30 flex flex-col items-center justify-center 
      text-sm lg:text-lg p-2 lg:p-3 rounded-lg cursor-pointer font-semibold
      ${day === slot.day ? "bg-cyan-700 text-white" : "bg-white text-cyan-800"}`}
                onClick={() => {
                  setDay(
                    day === slot.day ? null : slot.day,
                  );
                  setDate(slot.from);
                  console.log(checkAppoit)
                }}
              >
                <span>{daysOfWeek[slot.day]}</span>
                <span>{slot.from}</span>
                
              </div>
            ),
          )}
        </div>

        {day && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <div
              className={`border border-gray-500/30 flex items-center justify-center  text-sm lg:text-lg p-2  lg:p-3 rounded-lg  cursor-pointer font-semibold ${date === "10:00" ? "bg-amber-600 text-white" : "bg-white text-amber-700 "}`}
              onClick={() => setDate(date === "10:00" ? "" : "10:00")}
            >
              10:00
            </div>
            <div
              className={`border border-gray-500/30 flex items-center justify-center  text-sm lg:text-lg p-2  lg:p-3 rounded-lg  cursor-pointer font-semibold ${date === "10:30" ? "bg-amber-600 text-white" : "bg-white text-amber-700 "}`}
              onClick={() => setDate(date === "10:30" ? "" : "10:30")}
            >
              10:30
            </div>
            <div
              className={`border border-gray-500/30 flex items-center justify-center  text-sm lg:text-lg p-2  lg:p-3 rounded-lg  cursor-pointer font-semibold ${date === "11:00" ? "bg-amber-600 text-white" : "bg-white text-amber-700 "}`}
              onClick={() => setDate(date === "11:00" ? "" : "11:00")}
            >
              11:00
            </div>
          </div>
        )}
        <Button
          kind="secondary"
          size="large"
          disable={!date || !day}
          onClick={() => console.log(!date || !day)}
        >
          Book
        </Button>
      </div>
    </div>
  );
};

export default DoctorProfile;
