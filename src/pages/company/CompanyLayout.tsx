import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import CompanySidebar from "./CompanySidebar";

const CompanyLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-background text-foreground min-h-screen">

      {/* Sidebar */}
      <CompanySidebar
        open={open}
        onClose={() => setOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile Top Bar */}
        <div className="lg:hidden sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background px-4 py-3">

          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu size={22} />
          </button>

          <span className="font-semibold text-primary">
            HireUp Company
          </span>

        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-slate-50 dark:bg-slate-900">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default CompanyLayout;