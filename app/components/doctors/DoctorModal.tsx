import React from 'react'
import { Button, Dialog, DialogPanel } from "@headlessui/react";
import DoctorCard from './DoctorCard';
import { RootState } from "../../store/index";
import { useSelector } from "react-redux";
const DoctorModal = ({modal}:{modal:boolean}) => {
  const doctorData = useSelector((state: RootState) => state.doctor);

    return (
      <>
        <Dialog
          open={doctorData.isModalOpen}
          as="div"
          className="relative z-50 focus:outline-none shadow-xl shadow-gray-700/20"
          onClose={close}
        >
          <div className="fixed inset-0 z-50 w-screen overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
              >
              <DoctorCard doctorId={doctorData.doctor?._id|| ""} isModal={modal}/>
                <div className="mt-4">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                    onClick={close}
                  >
                    Got it, thanks!
                  </Button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </>
    );
  
  
}

export default DoctorModal