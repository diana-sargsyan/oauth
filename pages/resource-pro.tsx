import { useAuth } from "@/utils/auth";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Resource() {
  const [result, setResult] = useState<unknown>();
  const [error, setIsError] = useState(false);

  const { logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("/api/resource-pro", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setResult(res.data))
      .catch((res) => {
        setIsError(true);
        setResult(res.response.data.error);
      });
  }, []);

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="fixed left-0 top-0 h-[80px] w-full border-b border-slate-50">
        <div className="mx-auto w-[1175px] h-full justify-between flex flex-row items-center">
          <div className=" flex flex-row gap-5 items-center">
            <a href="/resource">Resource 1</a>
            <a href="/resource-pro">Resource 2</a>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
      <span>
        {error
          ? "You are not a Pro user"
          : "You are authenticated to get resource for Pro."}
      </span>
      <span>Result {JSON.stringify(result)}</span>
    </div>
  );
}
