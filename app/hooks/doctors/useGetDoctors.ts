import { api } from "@/app/lib/api";
import { useQuery } from "@tanstack/react-query";

{
  /*===>> functions */
}

const getDoctors = async (specialitie:string) => {
  const encoded = encodeURIComponent(specialitie);
  // console.log(encoded)
 const res = await api.get(`/doctors?specialization=${encoded}`)
 console.log(res)
 return res.data
};
const getDoctor = async (id:string) => {
 const res = await api.get(`/doctors/${id}`)
 console.log(res)
 return res.data
};


export const useDoctor = () => {
    /// get doctors
  const GetDoctors = (specialitie: string) => {
    return useQuery({
      queryKey: ["doctors", { specialitie }],
      queryFn: ()=> getDoctors(specialitie),
      staleTime: 60 * 1000,
    });
  };

  
  const GetDoctor = (id: string) => {
    return useQuery({
      queryKey: ["doctor",  id ],
      queryFn: ()=> getDoctor(id),
      staleTime: 60 * 1000,
    });
  };

  
  return {
    GetDoctors,GetDoctor
  };
};
