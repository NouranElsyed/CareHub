/* eslint-disable @typescript-eslint/no-explicit-any */

import { Days } from "@/app/types";
import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Timer,
  CalendarClock,
} from "lucide-react";
import Button from "../ui/Button";
import { useCancelAppoitment } from "@/app/hooks/appoiment/useAppoiment";
import { useDispatch } from "react-redux";

const ShowAppoitment = ({
  appoitment,
  doctorData,
}: {
  appoitment?: any;
  doctorData: any;
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

const dispatch = useDispatch();
const handleCancelAppointment = ()=>{

}

  useEffect(() => {
    if (!appoitment?.appointmentDate) return;

    const calculateTimeLeft = () => {
      const appointmentTime = new Date(appoitment.appointmentDate).getTime();
      const now = new Date().getTime();
      const difference = appointmentTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [appoitment]);

  const {
    mutate: cancelAppointment,
    // isPending: isCancelAppoitLoadding,
    isSuccess: isCancelSuccess,
    // error: CancelError,
  } = useCancelAppoitment();
 
  const date = new Date(appoitment.appointmentDate);

  const formattedDate = date.toLocaleDateString("en-US", {
    timeZone: "Africa/Cairo",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "pending":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "cancelled":
        return "text-rose-600 bg-rose-50 border-rose-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-3.5 h-3.5" />;
      case "pending":
        return <AlertCircle className="w-3.5 h-3.5" />;
      case "cancelled":
        return <XCircle className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Existing Appointment Banner */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <CalendarClock className="w-5 h-5 text-cyan-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">
              You have an appointment with
            </p>
            <p className="text-lg font-semibold text-cyan-800">
              Dr. {doctorData.doctor.name}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden w-full max-w-sm">
        {/* Mini Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2.5 flex md:flex-col lg:flex-row gap-3 justify-between items-center">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-white" />
            <h3 className="text-sm font-semibold text-white">
              Next Appointment
            </h3>
          </div>
          <div
            className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 border ${getStatusColor(appoitment.status)}`}
          >
            {getStatusIcon(appoitment.status)}
            <span className="capitalize">{appoitment.status}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Date & Time - Compact */}
          <div className="flex  md:flex-col gap-5  lg:flex-row items-center justify-between mb-3 pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 rounded-lg">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-gray-700">
                {formattedDate}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs text-gray-600">{formattedTime}</span>
              <span className="text-xs text-gray-400">
                ({Days[appoitment.dayOfWeek]})
              </span>
            </div>
          </div>

          {/* Compact Countdown */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-3 mb-3 border border-cyan-100">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <Timer className="w-3.5 h-3.5 text-cyan-600" />
                <span className="text-xs font-medium text-cyan-700">
                  Time left
                </span>
              </div>
              {timeLeft.days === 0 && timeLeft.hours < 24 && (
                <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                  Soon!
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-1.5">
                <div className="bg-white rounded-md px-2 py-1 shadow-sm min-w-[45px] text-center">
                  <span className="text-sm font-bold text-cyan-700">
                    {timeLeft.days}
                  </span>
                  <span className="text-[10px] text-gray-500 block -mt-0.5">
                    d
                  </span>
                </div>
                <span className="text-xs text-gray-400">:</span>
                <div className="bg-white rounded-md px-2 py-1 shadow-sm min-w-[45px] text-center">
                  <span className="text-sm font-bold text-blue-700">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-gray-500 block -mt-0.5">
                    h
                  </span>
                </div>
                <span className="text-xs text-gray-400">:</span>
                <div className="bg-white rounded-md px-2 py-1 shadow-sm min-w-[45px] text-center">
                  <span className="text-sm font-bold text-indigo-700">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-gray-500 block -mt-0.5">
                    m
                  </span>
                </div>
                <span className="text-xs text-gray-400 block md:hidden xl:block">
                  :
                </span>
                <div className="bg-white rounded-md px-2 py-1 shadow-sm min-w-[45px] text-center block md:hidden xl:block">
                  <span className="text-sm font-bold text-purple-700">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-gray-500 block -mt-0.5">
                    s
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mini Actions */}
          <div className="flex flex-row md:flex-col xl:flex-row gap-2 mt-2 pt-2 border-t border-gray-100 justify-center">
            {appoitment.canReschedule && (
              <Button
                className="flex gap-2 items-center flex-1 justify-center"
                kind={"primary"}
                size={"small"}
              >
                <Clock className="w-3 h-3" />
                Edit
              </Button>
            )}
            {appoitment.canCancel && (
              <Button
                kind={"cancel"}
                size={"small"}
                className="flex gap-2 items-center flex-1 justify-center"
                onClick={() => {
                  console.log("cancel");
                  console.log(appoitment._id)
                  cancelAppointment({ id: appoitment._id });
                }}
              >
                <XCircle className="w-3 h-3" />
                Cancel
              </Button>
            )}
          </div>

          {/* Appointment ID - Mini */}
          <div className="mt-2 text-[10px] text-gray-400 text-right">
            ID: {appoitment._id?.slice(-6) || "N/A"}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowAppoitment;
