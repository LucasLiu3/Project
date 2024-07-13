import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isLoading: isChecking, mutate: checkOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: () => {
      toast.success("Check out Successfully");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => toast.error("error in check out"),
  });

  return { isChecking, checkOut };
}
