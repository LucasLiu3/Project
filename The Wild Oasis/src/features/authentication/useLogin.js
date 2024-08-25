/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loginUser } from "../../services/apiUser";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isLogin, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user", data.user]);
      toast.success("Login Successfully");
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => toast.error("email or password is incorrect"),
  });

  return { isLogin, login };
}
