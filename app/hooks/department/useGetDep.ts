import { api } from "@/app/lib/api";
import { useQuery } from "@tanstack/react-query";


const getSpecialitie  = async () => {
 const res = await api.get(`/doctors/specializations`)
 console.log(res)
 return res.data
};

export const useGetSpecialitie= () => {
  
    return useQuery({
      queryKey: ["specialitie", ],
      queryFn: getSpecialitie,
      staleTime: 60 * 1000,
    });
  };
