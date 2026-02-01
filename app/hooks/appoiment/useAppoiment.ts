import { api } from "@/app/lib/api";
import { useQuery } from "@tanstack/react-query";

const getDoctorAppoitment = async (id: string, day: number, time: string) => {
  const body = {
    day: day,
    time: time,
  };
  console.log(body);
  const res = await api.post(`/appointments/${id}/find-dates`, body);
  console.log(res);
  return res.data;
};

export const useAppoitment = () => {
  const GetDoctorAppoitment = (doctorId: string, day: number, time: string) => {
    return useQuery({
      queryKey: ["appoiment", doctorId],
      queryFn: () => getDoctorAppoitment(doctorId, day, time),
      enabled: !!doctorId && day !== null && !!time,
    });
  };

  return { GetDoctorAppoitment };
};
