import { getUser } from "../api/DevTreeApi";
import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
  const dataUser = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: 2,
    refetchOnWindowFocus: false,
  });
  return {
    dataUser,
  };
};
