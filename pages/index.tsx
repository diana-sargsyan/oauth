import { useAuth } from "@/utils/auth";

export default function Home() {
  const { isAuthenticated, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
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
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-5 mx-auto w-full h-screen items-center justify-center">
      <a
        className="w-[250px] h-12 flex items-center justify-center text-[18px] font-bold text-white bg-indigo-600 rounded-[6px]"
        href="/login"
      >
        Sign In
      </a>
      <a
        className="w-[250px] h-12 flex items-center justify-center text-[18px] font-bold text-white bg-indigo-600 rounded-[6px]"
        href="/register"
      >
        Sign Up
      </a>
    </div>
  );
}
