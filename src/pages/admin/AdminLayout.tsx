import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-background text-foreground min-h-screen">
      {/* Sidebar (drawer on mobile, static on desktop) */}
      <AdminSidebar open={open} onClose={() => setOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar (only visible < lg) */}
        <div className="lg:hidden sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background px-4 py-3">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <span className="font-semibold text-primary">HireUp Admin</span>
        </div>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
