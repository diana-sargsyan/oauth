import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setIsAuthenticated(true);
      setLoading(false);
      return;
    } else {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }
  }, []);

  async function login(username: string, password: string) {
    const { data } = await axios.post(`/api/login`, { username, password });

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("isPro", data.isPro);

    setIsAuthenticated(true);
  }

  async function register(username: string, password: string, isPro: boolean) {
    const { data } = await axios.post(`/api/register`, {
      username,
      password,
      isPro,
    });

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("isPro", String(isPro));

    setIsAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isPro");
    setIsAuthenticated(false);
    router.push("/");
  }

  return {
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };
}
