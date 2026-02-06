/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import { useDoctor } from "@/app/hooks/doctors/useGetDoctors";
import Loading from "@/app/components/ui/Loading";
import { Calendar, CheckCheck, CircleCheckBig } from "lucide-react";
import { useState } from "react";
import Button from "@/app/components/ui/Button";
import { daysOfWeek } from "@/app/types";
import { useAppoitment } from "@/app/hooks/appoiment/useAppoiment";
import DoctorCard from "@/app/components/doctors/DoctorCard";
import ErrorPage from "@/app/components/Error/Error";

const DoctorProfile = () => {
  //* get id from params*//
  const { id } = useParams();
  const doctorId = id?.toString();
  //* states*//
  const [day, setDay] = useState<number | null>(null);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  //* call hooks*//
  const {data,isLoading, isError, isSuccess, error } = useDoctor().GetDoctor(
    doctorId!,
  );
  const { data: checkAppoit, isLoading: isAppoitLoadding } =
    useAppoitment().GetDoctorAppoitment(doctorId!, day!, time);
  const { BookAppoitment } = useAppoitment();

  const {
    mutate: bookAppointment,
    isPending: isBookAppoitLoadding,
    isSuccess: isBookSuccess =true,
     error: bookingError 
  } = BookAppoitment;
  //* loading and Errors return **//
  if (isLoading) {
    return <Loading />;
  }
  
if (isError || !isSuccess) {
  return (
    <ErrorPage
      title="Doctor Error"
      message={(error as any)?.response?.data?.message || "Something went wrong"}
    />
  );
}

if (bookingError) {
  return (
    <ErrorPage
      title="Booking Failed"
      message={(bookingError as any)?.response?.data?.message || "Unable to book"}
    />
  );
}
 
  

  return (
    <div className="w-9/10  mx-auto min-h-screen flex flex-col md:flex-row items-stretch  justify-center py-30 gap-5">
      <DoctorCard doctorId={doctorId!}/>
      <div className="w-full md:w-1/3  p-5  rounded-2xl h-full bg-white shadow-xl shadow-gray-700/20 flex flex-col gap-5">
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
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-3">
          {isBookSuccess && <div className="text-md text-cyan-600 flex items-center gap-2 my-3"><CheckCheck size={20} /><span>Booked successfully</span></div> ||  data?.doctor?.availableSlots?.map(
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
      text-sm lg:text-md p-2 lg:p-3 rounded-lg cursor-pointer font-semibold
      ${day === slot.day ? "bg-cyan-700 text-white" : "bg-white text-cyan-800"}`}
                onClick={() => {
                  setDay(day === slot.day ? null : slot.day);
                  setTime(slot.from);
                }}
              >
                <span>{daysOfWeek[slot.day]}</span>
                <span>{slot.from}</span>
              </div>
            ),
          )}
        </div>

        {!isBookSuccess&&day && (
          <div className="grid grid-cols-1 gap-3 ">
            {(isAppoitLoadding && <Loading />) ||
              checkAppoit?.availableDates?.map(
                (
                  slotDate: {
                    slots: { booked: number; free: number; total: number };
                    date: string;
                    dayName: string;
                    formattedDate: string;
                  },
                  index: number,
                ) => {
                  if (slotDate.slots.free === 0) return null;
                  return (
                    <div
                      key={index}
                      className={`border border-gray-500/30 flex items-center justify-center  text-sm  p-2  lg:p-3 rounded-lg  cursor-pointer font-semibold ${date === slotDate.date ? "bg-amber-600 text-white" : "bg-white text-amber-700 "}`}
                      onClick={() => {
                        setDate(date === slotDate.date ? "" : slotDate.date);
                      }}
                    >
                      {slotDate.formattedDate}
                    </div>
                  );
                },
              )}
          </div>
        )}
         {!isBookSuccess &&<Button
          kind="primary"
          size="large"
          disable={!date || !day}
          onClick={() => {
            console.log("BOOK DATA:", { doctorId, day, date, time });

            bookAppointment({
              id: doctorId!,
              day: day!,
              time,
            });
          }}
        >
          {isBookAppoitLoadding ? "Booking..." : "Book"}
        </Button>}
      </div>
    </div>
  );
};

export default DoctorProfile;
