/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetDoctor } from "@/app/hooks/doctors/useGetDoctors";
import { useParams } from "next/navigation";
import DoctorCard from "@/app/components/doctors/DoctorCard";
import BookingCard from "@/app/components/appoitment/BookingCard";
import Loading from "@/app/components/ui/Loading";
import ErrorPage from "@/app/components/Error/Error";
import { useDispatch } from "react-redux";
import { setShowedDoctor } from "@/app/store/features/doctorSlice";
import { useEffect } from "react";

const DoctorProfile = () => {
  //* get id from params*//
  const { id } = useParams();
  const doctorId = id?.toString();
  //* call hooks*//
  const dispatch = useDispatch();
useEffect(() => {
  if (doctorId) {
    dispatch(setShowedDoctor({ doctorId: doctorId, isModalOpen: false }));
  }
}, [doctorId, dispatch]);   
  const { data, isLoading, isError, isSuccess, error } = useGetDoctor();
  //* loading and Errors return **//
  if (isLoading) {
    return <Loading />;
  }

  if (isError || !isSuccess) {
    return (
      <ErrorPage
        title="Doctor Error"
        message={
          (error as any)?.response?.data?.message || "Something went wrong"
        }
      />
    );
  }
  return (
    <div className="w-9/10  mx-auto min-h-screen flex flex-col md:flex-row items-stretch  justify-center py-30 gap-5">
      <DoctorCard doctorId={doctorId!} doctorData={data} />
      <BookingCard doctorData={data}  />
    </div>
  );
};

export default DoctorProfile;
