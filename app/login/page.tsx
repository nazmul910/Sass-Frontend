
"use client";

import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import api from "../../utils/axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    const res = await api.post("/auth/login", {
      email: "test@gmail.com",
      password: "123456",
    });

    dispatch(setUser(res.data));
    router.push("/dashboard");
  };

  return <button onClick={handleLogin}>Login</button>;
}