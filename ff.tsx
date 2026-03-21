/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useBookAppoitment,
  useGetDoctorAppoitment,
} from "@/app/hooks/appoiment/useAppoiment";

import { useState, useEffect, useCallback } from "react";
import Loading from "../ui/Loading";
import ErrorPage from "../Error/Error";
import { Calendar, CircleCheckBig } from "lucide-react";
import { daysOfWeek } from "@/app/types";
import Button from "../ui/Button";
import ShowAppoitment from "./ShowAppoitment";
import { useQueryClient } from "@tanstack/react-query";
import { Rings } from "react-loader-spinner";

const BookingCard = ({ doctorData }: { doctorData: any }) => {
  const [day, setDay] = useState<number | null>(null);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState(0);

  const queryClient = useQueryClient();

  const userAppoit = !!doctorData.myAppointment;

  const { data: checkAppoit, isLoading: isAppoitLoadding } =
    useGetDoctorAppoitment(doctorData.doctor.id!, day!, time);

  const {
    mutate: bookAppointment,
    isPending: isBookAppoitLoadding,
    isSuccess: isBookSuccess,
    error: bookingError,
  } = useBookAppoitment();

  const refreshData = useCallback(() => {
    queryClient.invalidateQueries({ 
      queryKey: ["doctorAppointment", doctorData.doctor.id] 
    });
    queryClient.invalidateQueries({ 
      queryKey: ["doctorSlots", doctorData.doctor.id] 
    });
    setRefreshKey(prev => prev + 1);
  }, [doctorData.doctor.id, queryClient]);

  // ✅ حل التحذير: استخدام useEffect مع setTimeout
  useEffect(() => {
    let isMounted = true;

    if (isBookSuccess) {
      const timer = setTimeout(() => {
        if (isMounted) {
          setDay(null);
          setDate("");
          refreshData();
        }
      }, 100);

      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    }
  }, [isBookSuccess, refreshData]);

  if (bookingError) {
    return (
      <ErrorPage
        title="Booking Failed"
        message={
          (bookingError as any)?.response?.data?.message || "Unable to book"
        }
      />
    );
  }

  return (
    <div key={refreshKey} className="w-full md:w-1/3 p-5 rounded-2xl h-full bg-white shadow-xl shadow-gray-700/20 flex flex-col gap-5">
      <h5 className="text-2xl font-semibold text-cyan-900">Book appointment</h5>
      <div className="bg-cyan-200/15 rounded-2xl px-4 py-5 ">
        <div className="flex flex-col">
          <h5 className="text-gray-600 text-sm">Consultation price</h5>
          <div className="flex justify-between items-center">
            <span className="text-black font-bold text-3xl">
              {doctorData.doctor?.price} <span className="text-sm">EG</span>
            </span>
            <div className="text-cyan-800">
              <CircleCheckBig />
            </div>
          </div>
        </div>
      </div>

      {userAppoit ? (
        <div className="flex flex-col justify-between items-center gap-4">
          <ShowAppoitment
            appoitment={doctorData.myAppointment}
            doctorData={doctorData}
            onChange={refreshData}
          />
        </div>
      ) : (
        <>
          <div className="flex gap-3 items-center flex-wrap">
            {isBookSuccess ? (
              <div className="text-cyan-600 flex flex-col w-full items-center gap-4">
                <div className="text-green-600 font-bold text-lg">
                  ✓ Appointment booked successfully!
                </div>
                <div className="text-gray-500 text-sm">
                  Your appointment has been confirmed.
                </div>
              </div>
            ) : (
              doctorData?.doctor?.availableSlots?.map(
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
                      text-sm lg:text-md p-2 lg:p-3 rounded-lg cursor-pointer font-semibold transition-all duration-300
                      ${
                        day === slot.day
                          ? "bg-gradient-to-r from-cyan-700 to-blue-700 text-white shadow-lg scale-105"
                          : "bg-white text-cyan-800 hover:bg-cyan-50 hover:border-cyan-300"
                      }`}
                    onClick={() => {
                      setDay(day === slot.day ? null : slot.day);
                      setTime(slot.from);
                    }}
                  >
                    <span>{daysOfWeek[slot.day]}</span>
                    <span>{slot.from}</span>
                  </div>
                ),
              )
            )}
          </div>

          {!isBookSuccess && day !== null && (
            <div className="space-y-3">
              <h6 className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                Available Dates
              </h6>
              <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                {isAppoitLoadding ? (
                  <div className="flex justify-center py-8">
                    <Loading />
                  </div>
                ) : (
                  checkAppoit?.availableDates?.map(
                    (dates: any, index: number) => {
                      if (dates.remaining === 0) return null;
                      return (
                        <div
                          key={index}
                          className={`border flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300
                            ${
                              date === dates.date
                                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-600 shadow-lg"
                                : "bg-white text-amber-700 border-amber-200 hover:bg-amber-50"
                            }`}
                          onClick={() => {
                            setDate(date === dates.date ? "" : dates.date);
                          }}
                        >
                          <span className="font-medium">
                            {dates.formattedDate}
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-white/20">
                            {dates.remaining} slots
                          </span>
                        </div>
                      );
                    },
                  )
                )}
              </div>
            </div>
          )}

          {!isBookSuccess && (
            <Button
              kind="primary"
              size="large"
              disable={!date || !day || isBookAppoitLoadding}
              className={`mt-4 ${
                !date || !day
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              }`}
              onClick={() => {
                bookAppointment(
                  {
                    id: doctorData.doctor.id!,
                    date: date!,
                    time,
                  }
                );
              }}
            >
              {isBookAppoitLoadding ? (
                <div className="flex items-center gap-2 justify-center">
                  <Rings
                    visible={true}
                    height="20"
                    width="20"
                    color="#ffffff"
                    ariaLabel="rings-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                  <span>Booking...</span>
                </div>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default BookingCard;