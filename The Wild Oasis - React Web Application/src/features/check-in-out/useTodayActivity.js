import { useQuery } from "@tanstack/react-query";

import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const fetchedData = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity", "bookings"],
  });

  const { data: todayActivity, isLoading, error } = fetchedData;

  return { todayActivity, isLoading, error };
}
