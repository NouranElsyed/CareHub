/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Star, Stethoscope } from "lucide-react";
import { doctorInfo } from "@/app/data";

const DoctorCard = ({
  isModal,
  doctorData
}: {
  doctorId?: string;
  isModal?: boolean;
  doctorData:any
}) => {
console.log(doctorData)
  return (
    // <div className="absolute top-5 left-10 p-15">
    <div
      className={`flex ${isModal ? "flex-col w-full" : "flex-col bg-white shadow-xl shadow-gray-700/20 w-full md:w-2/3 md:flex-row  md:items-start "} items-center  p-4 gap-5 rounded-3xl `}
    >
      <div className="flex  items-center justify- gap-5">
        <div className={`flex flex-col items-center justify-center gap-5`}>
          <div className="rounded-2xl overflow-hidden w-full h-[180px] relative self-start  shadow-md shadow-gray-700/20">
            <Image
              src={doctorData?.doctor?.image}
              fill
              alt="doctor image"
              className="object-cover object-center origin-center"
            />
          </div>

          {!isModal && (
            <div className="bg-amber-200/30 rounded-lg px-4 py-1 text-[#ffd000e2] flex gap-2 items-center justify-center w-full">
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
            </div>
          )}
          {isModal && (
            <div className="flex flex-col items-center lg:items-start  justify-start ">
              <h3 className="text-cyan-900  font-semibold mb-2 text-2xl">
                <span className="text-amber-500  font-bold ">Dr. </span>
                {doctorData?.doctor?.name}
              </h3>
              <span className="flex gap-3 items-center bg-cyan-200/30 px-4 py-1 rounded-2xl text-cyan-800 font-semibold">
                <Stethoscope size={18} />{" "}
                <span>{doctorData?.doctor?.specialization}</span>
              </span>
              <p className=" text-gray-700/70 text-center lg:text-start w-2/3 lg:w-full text-sm my-3">{`Experienced cardiologist providing accurate diagnosis.
Committed to trusted and patient-centered care.`}</p>

              <div className=" rounded-lg px-4 py-1 text-[#ffd000e2] flex gap-2 items-center justify-center w-full">
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
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center md:items-start  justify-start  w-full">
        {!isModal && (
          <div className="flex flex-col items-center md:items-start  justify-start">
            <h3 className="text-cyan-900  font-semibold mb-2 text-2xl">
              <span className="text-amber-500  font-bold ">Dr. </span>
              {doctorData.doctor?.name}
            </h3>
            <span className="flex gap-3 items-center bg-cyan-200/30 px-4 py-1 rounded-2xl text-cyan-800 font-semibold">
              <Stethoscope size={18} />{" "}
              <span>{doctorData?.doctor?.specialization}</span>
            </span>
            <p className=" text-gray-700/70 text-center lg:text-start w-2/3 lg:w-full text-sm my-3">{`Experienced cardiologist providing accurate diagnosis.
Committed to trusted and patient-centered care.`}</p>
          </div>
        )}

        {isModal ? (
          <div
            className={`grid w-full   ${isModal ? "grid-cols-1 md:grid-cols-2 gap-3 justify-start" : " grid-cols-1 xl:grid-cols-2 gap-4"}`}
          >
            {doctorInfo.map((info) => {
              return (
                <div
                  key={info.datatitle}
                  className="bg-gray-500/5 rounded-2xl p-2 flex flex-col gap-2 justify-start"
                >
                  <div className="flex items-center gap-2 ms-2 ">
                    <span
                      className={`${info.bgColor} rounded-lg p-2 ${info.iconColor}`}
                    >
                      {info.iconModal}
                    </span>
                    <h5 className="text-gray-600">{info.datatitle}</h5>
                  </div>
                  <div className="text-sm ms-3 self-center">
                    <span className="text-sm font-medium text-gray-500">
                      {info.data}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className={`grid w-full   ${isModal ? "grid-cols-1 md:grid-cols-2 gap-2 justify-start" : " grid-cols-1 xl:grid-cols-2 gap-4"}`}
          >
            {doctorInfo.map((info) => {
              return (
                <div
                  key={info.datatitle}
                  className="bg-gray-300/05 rounded-2xl p-3 flex gap-2 items-center "
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
        )}
      </div>
    </div>
    // </div>
  );
};

export default DoctorCard;
