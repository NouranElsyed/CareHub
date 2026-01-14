import { api } from "@/app/lib/api";
import { useQuery } from "@tanstack/react-query";

{
  /* functions */
}

const getDoctos = async (specialitie:string) => {
  const encoded = encodeURIComponent(specialitie);
  console.log(encoded)
 const res = await api.get(`/doctors?specialization=${encoded}`)
 console.log(res)
 return res.data
};

export const useDoctor = () => {
    /// get doctors
  const GetDoctors = (specialitie: string) => {
    return useQuery({
      queryKey: ["doctors", { specialitie }],
      queryFn: ()=> getDoctos(specialitie),
      staleTime: 60 * 1000,
    });
  };


  
  return {
    GetDoctors,
  };
};
