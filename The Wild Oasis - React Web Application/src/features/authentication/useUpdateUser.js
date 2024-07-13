import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser } from "../../services/apiUser";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: update } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Update Successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: () => toast.error("Update Error"),
  });

  return { isUpdating, update };
}
