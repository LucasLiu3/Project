import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useGetBookingId() {
  const { bookingId } = useParams();

  const fetchedData = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBooking(bookingId),
  });

  const { data: booking, isLoading } = fetchedData;

  return { booking, isLoading };
}
