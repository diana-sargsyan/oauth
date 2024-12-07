import { useAuth } from "@/utils/auth";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPro, setIsPro] = useState(false);

  const router = useRouter();
  const { register } = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await register(username, password, isPro);
      router.push("/");
    } catch (err) {
      console.error("Sign Up failed", err);
      alert("Invalid username or password");
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[350px] items-center justify-center p-6 flex flex-col gap-4 rounded-[6px] border border-indigo-600"
      >
        <span>Sign Up With Username and Password</span>
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
        <div className="flex flex-row justify-between items-center w-full">
          <span>Do you want to be Pro User</span>
          <input
            type="checkbox"
            checked={isPro}
            onChange={(e) => {
              setIsPro(e.currentTarget.checked);
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 flex items-center justify-center text-[18px] font-bold text-white bg-indigo-600 rounded-[6px]"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
