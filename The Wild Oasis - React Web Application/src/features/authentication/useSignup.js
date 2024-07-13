/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signupUser } from "../../services/apiUser";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isSignUping, mutate: signUp } = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      toast.success("Create Successfully");
    },
    onError: (err) => toast.error("email or password is incorrect"),
  });

  return { isSignUping, signUp };
}
