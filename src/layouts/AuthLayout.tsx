import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
export default function AuthLayout() {
  return (
    <>
      <div className="min-h-screen bg-slate-800">
        <div className="max-w-lg px-5 pt-10 mx-auto">
          <img src="/logo.svg" alt="logotipo devtree" />
          <div className="py-10">
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster position={"top-right"} />
    </>
  );
}
