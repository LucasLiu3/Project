import { useQuery } from "@tanstack/react-query";

import { getCabins } from "../../services/apiCabins";

export function useGetCabin() {
  const fetchedData = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const { data: cabins, isLoading, error } = fetchedData;

  return { cabins, isLoading, error };
}
