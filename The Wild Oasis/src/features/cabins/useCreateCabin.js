import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createAndEidtCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreateing, mutate: createCabin } = useMutation({
    mutationFn: (newCabin) => createAndEidtCabin(newCabin),
    onSuccess: () => {
      toast.success("Create Successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreateing, createCabin };
}
