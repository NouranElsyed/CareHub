import { api } from "@/app/lib/api";
import { RootState } from "@/app/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const getDoctorAppoitment = async (id: string, day: number, time: string) => {
  const body = {
    day: day,
    time: time,
  };
  console.log(body);
  const res = await api.post(`/appointments/${id}/available-dates`, body, {
    withCredentials: true,
  });
  console.log(res);
  return res.data;
};

const cancelAppoit = async (id: string) => {

  const res = await api.delete(`/appointments/${id}/cancel`, {
    withCredentials: true,
  });
  console.log(res);
  return res.data;
};

const bookAppoit = async (id: string, date: string, time: string) => {
  //  { doctorId, date, time, notes, isForDependent, dependentData }
  const body = {
    doctorId: id,
    date: date,
    time: time,
  };
  console.log(body);
  const res = await api.post(`/appointments/book`, body, {
    withCredentials: true,
  });
  console.log(res);
  return res.data;
};

const patientAppoit = async (doctorId:string) => {
console.log(doctorId)
  const res = await api.get(`/appointments/my-appointments`, {
    withCredentials: true,
  });
  console.log(res);
  return res.data;
};

const patientAppoitwithSpecDoctor = async (doctorId:string) => {
console.log(doctorId)
  const res = await api.get(`/appointments/my-appointments`, {
    withCredentials: true,
  });
  console.log(res);
  return res.data;
};
export const useGetDoctorAppoitment = (
  doctorId: string,
  day: number,
  time: string,
) => {
  return useQuery({
    queryKey: ["appoiment", doctorId, day, time],
    queryFn: () => getDoctorAppoitment(doctorId, day, time),
    enabled: !!doctorId && day !== null && !!time,
    refetchOnWindowFocus: false,
  });
};

export const useBookAppoitment = () =>
  useMutation({
    mutationFn: ({
      id,
      date,
      time,
    }: {
      id: string;
      date: string;
      time: string;
    }) => bookAppoit(id, date, time),

    onError: (error: { response: { data: string } }) => {
      console.log(error);
      console.log("SERVER ERROR:", error.response?.data);
    },

    onSuccess: (data) => {
      console.log("SUCCESS:", data.message);
    },
  });
export const useCancelAppoitment = () =>
  useMutation({
    mutationFn: ({
      id
    }: {
      id: string;
    }) => cancelAppoit(id),

    onError: (error: { response: { data: string } }) => {
      console.log(error);
      console.log("SERVER ERROR:", error.response?.data);
    },

    onSuccess: (data) => {
      console.log("SUCCESS:", data.message);
    },
  });
export const useGetPatientAppoitment =(
) => {
    const doctorState = useSelector((state: RootState) => state.doctor);
    const doctorId = doctorState.doctorId
  console.log(doctorState.doctorId)
  return useQuery({

 queryKey: ["userappoiment"],
    queryFn: () => patientAppoit(doctorId!),
    enabled: !!doctorId,
    refetchOnWindowFocus: false,


  });}

  export const useGetPatientAppoitmentWithSpecDoctor =(
) => {
    const doctorState = useSelector((state: RootState) => state.doctor);
    const doctorId = doctorState.doctorId
  console.log(doctorState.doctorId)
  return useQuery({

 queryKey: ["userappoiment", doctorId],
    queryFn: () => patientAppoitwithSpecDoctor(doctorId!),
    enabled: !!doctorId,
    refetchOnWindowFocus: false,


  });}
