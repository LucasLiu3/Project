import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getAllBooking } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useGetBooking() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  //filter
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortedValue = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortedValue.split("-");

  //sort
  const sortBy = { field, direction };

  //pagenation
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const fetchedData = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getAllBooking({ filter, sortBy, page }),
  });

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = fetchedData;

  //PRE-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getAllBooking({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getAllBooking({ filter, sortBy, page: page - 1 }),
    });

  return { bookings, isLoading, error, count };
}
