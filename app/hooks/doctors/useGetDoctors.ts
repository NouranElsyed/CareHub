import { api } from "@/app/lib/api";
import { RootState } from "@/app/store";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

{
  /*===>> functions */
}

const getDoctors = async (specialitie:string) => {
  const encoded = encodeURIComponent(specialitie);
  // console.log(encoded)
  const res = await api.get(`/doctors?specialization=${encoded}`)
  console.log(res.data)
  return res.data
};
const getDoctor = async (id:string) => {
  console.log(id)
  const res = await api.get(`/doctors/${id}`)
  console.log(res)
  return res.data
};



export const useGetDoctor = () => {
  const doctorState = useSelector((state: RootState) => state.doctor);
  console.log(doctorState.doctorId)
 return useQuery({
      queryKey: ["doctor", doctorState.doctorId ],
      queryFn: ()=> getDoctor(doctorState.doctorId!),
      staleTime: 60 * 1000,
    });}

export const useGetDoctors = (specialitie: string) => {
    return useQuery({
      queryKey: ["doctors", { specialitie }],
      queryFn: ()=> getDoctors(specialitie),
      staleTime: 60 * 1000,
    });
  };

  
