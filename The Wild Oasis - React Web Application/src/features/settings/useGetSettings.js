import { useQuery } from "@tanstack/react-query";

import { getSettings } from "../../services/apiSettings";

export function useGetSettings() {
  const fetchedData = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const { data: settings, isLoading } = fetchedData;

  return { settings, isLoading };
}
