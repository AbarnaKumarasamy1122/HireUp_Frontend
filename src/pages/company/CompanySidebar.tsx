import { NavLink, useParams } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const CompanySidebar = () => {
  const { id } = useParams();
  
  const { logout } = useAuth();

  const menus = [
    { name: "Dashboard", path: `/company/${id}/dashboard`, icon: <LayoutDashboard size={20} /> },
    { name: "Post Job", path: `/company/${id}/post-job`, icon: <PlusCircle size={20} /> },
    { name: "Manage Jobs", path: `/company/${id}/manage-jobs`, icon: <Briefcase size={20} /> },
    { name: "Applicants", path: `/company/${id}/applicants`, icon: <Users size={20} /> },
    { name: "Analytics", path: `/company/${id}/analytics`, icon: <BarChart3 size={20} /> },
  ];

  return (
    <div className="w-64 min-h-screen flex flex-col border-r border-border bg-background">

      {/* HEADER */}
      <div className="p-5 border-b border-border">
        <h1 className="text-2xl font-bold text-primary">HireUp</h1>
        <p className="text-xs text-muted">Company Panel</p>
      </div>

      {/* MENU */}
      <div className="flex-1 p-3 space-y-2">
        {menus.map((m) => (
          <NavLink
            key={m.path}
            to={m.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium
              ${
                isActive
                  ? "bg-primary text-white shadow"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800"
              }`
            }
          >
            {m.icon}
            {m.name}
          </NavLink>
        ))}
      </div>

      {/* LOGOUT */}
      <div className="p-4 border-t border-border">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default CompanySidebar;