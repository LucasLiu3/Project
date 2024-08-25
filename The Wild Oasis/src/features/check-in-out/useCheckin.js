import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isChecking, mutate: checkIn } = useMutation({
    mutationFn: ({ id, newCheckin }) => updateBooking(id, newCheckin),
    onSuccess: () => {
      toast.success("Check in Successfully");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      navigate("/");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isChecking, checkIn };
}
