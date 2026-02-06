import { api } from "@/app/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

const getDoctorAppoitment = async (id: string, day: number, time: string) => {
  const body = {
    day: day,
    time: time,
  };
  console.log(body);
  const res = await api.post(`/appointments/${id}/find-dates`, body, {
  withCredentials: true,
});
  console.log(res);
  return res.data;
};

const bookAppoit = async (id: string, day: number, time: string) => {
  const body = {
    day: day,
    time: time,
  };
  console.log(body);
  const res = await api.post(`/appointments/${id}/book`, body, {
  withCredentials: true,
});
  console.log(res);
  return res.data;
};

export const useAppoitment = () => {
  const GetDoctorAppoitment = (doctorId: string, day: number, time: string) => {
    return useQuery({
      queryKey: ["appoiment", doctorId, day, time],
      queryFn: () => getDoctorAppoitment(doctorId, day, time),
      enabled: !!doctorId && day !== null && !!time,
      refetchOnWindowFocus: false,
    });
  };

  const BookAppoitment = useMutation({
    mutationFn:({id, day, time}:{id: string, day: number, time: string})=>bookAppoit(id, day, time),
    
  onError: (error:{response:{data:string}}) => {
    console.log("SERVER ERROR:", error.response?.data); // 👈 هنا الرسالة
  },

  onSuccess: (data) => {
    console.log("SUCCESS:", data);
  },

  })
 
  return { GetDoctorAppoitment,BookAppoitment };
};
