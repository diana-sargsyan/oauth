import { useAuth } from "@/utils/auth";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { login } = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await login(username, password);
      router.push("/");
    } catch (err) {
      console.error("Login failed", err);
      alert("Invalid username or password");
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[350px] items-center justify-center p-6 flex flex-col gap-4 rounded-[6px] border border-indigo-600"
      >
        <span>Sign In With Username and Password</span>
        <input
          type="text"
          placeholder="Username"
          className="w-full h-11 rounded-[6px] p-2 focus:outline-none text-black"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full h-11 rounded-[6px] p-2 focus:outline-none text-black"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />

        <button
          type="submit"
          className="w-full h-12 flex items-center justify-center text-[18px] font-bold text-white bg-indigo-600 rounded-[6px]"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
