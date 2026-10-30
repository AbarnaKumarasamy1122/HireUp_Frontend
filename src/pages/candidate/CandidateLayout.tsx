import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import CandidateSidebar from "./CandidateSidebar";

const CandidateLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-background min-h-screen">

      <CandidateSidebar
        open={open}
        onClose={() => setOpen(false)}
      />

      <div className="flex-1 flex flex-col">

        <div className="lg:hidden border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => setOpen(true)} className="cursor-pointer">
            <Menu />
          </button>

          <span className="font-semibold text-primary">
            HireUp Candidate
          </span>
        </div>

        <main className="flex-1 p-4 md:p-8 bg-slate-50 dark:bg-slate-100">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default CandidateLayout;