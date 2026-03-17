"use client";
import React from "react";
import {  Dialog, DialogPanel } from "@headlessui/react";
import DoctorCard from "./DoctorCard";
import { RootState } from "../../store/index";
import { useSelector, useDispatch } from "react-redux";
import { setShowedDoctor } from "@/app/store/features/doctorSlice";
import Button from "../ui/Button";
import { useGetDoctor } from "@/app/hooks/doctors/useGetDoctors";
import Loading from "../ui/Loading";

const DoctorModal = ({ modal }: { modal: boolean }) => {
  const dispatch = useDispatch();
  const doctorState = useSelector((state: RootState) => state.doctor);
  const handleClose = () => {
    dispatch(
      setShowedDoctor({
        doctorId: null,
        isModalOpen: false,
      }),
    );
  };
  const { data,isLoading } = useGetDoctor();
  if(isLoading) return <Loading/>
  console.log(data)
  return (

    <Dialog
      open={doctorState.isModalOpen}
      as="div"
      className="relative z-50 focus:outline-none shadow-xl shadow-gray-700/30"
      onClose={handleClose}
    >
      <div className="fixed inset-0 Z-40 bg-gray-800/40 backdrop-blur-sm" />
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full flex flex-col justify-center items-center max-w-md rounded-xl bg-white/80 p-6 backdrop-blur-3xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DoctorCard
              doctorId={data?.doctor?.id || ""}
              isModal={modal}
              doctorData={data??null}
            />

            <div className="flex flex-col md:flex-row items-center gap-3">
              <Button
                className=""
                onClick={handleClose}
                kind="secondary"
                size="small"
              
              >
                close
              </Button>
              <Button
                className=""
                href={`/doctors/${data?.doctor?.id}`}
                kind="primary"
                size="small"
              
              >
                book appoitment
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
     

    </Dialog>

  );
};

export default DoctorModal;
