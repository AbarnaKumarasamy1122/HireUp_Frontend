import { NavLink, useParams } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  Users,
  BarChart3,
  LogOut,
  X,
} from "lucide-react";

import logo from "/images/logo.png";
import { useAuth } from "../../context/AuthContext";

interface CompanySidebarProps {
  open?: boolean;
  onClose?: () => void;
}

const CompanySidebar = ({
  open = false,
  onClose,
}: CompanySidebarProps) => {
  const { id } = useParams();
  const { logout } = useAuth();

  const menus = [
    {
      name: "Dashboard",
      path: `/company/${id}/dashboard`,
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Post Job",
      path: `/company/${id}/post-job`,
      icon: <PlusCircle size={20} />,
    },
    {
      name: "Manage Jobs",
      path: `/company/${id}/manage-jobs`,
      icon: <Briefcase size={20} />,
    },
    {
      name: "Applicants",
      path: `/company/${id}/applications`,
      icon: <Users size={20} />,
    },
    {
      name: "Analytics",
      path: `/company/${id}/analytics`,
      icon: <BarChart3 size={20} />,
    },
  ];

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50
          w-64 h-screen
          border-r border-border bg-background
          flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-3 right-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="p-5 border-b border-border flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="w-16"
          />

          <div>
            <h1 className="text-2xl font-bold text-primary">
              HireUp
            </h1>

            <p className="text-sm text-muted">
              Company Panel
            </p>
          </div>
        </div>

        {/* Menus */}
        <div className="flex-1 p-3 space-y-2 overflow-y-auto">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-primary text-white shadow"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`
              }
            >
              {menu.icon}
              {menu.name}
            </NavLink>
          ))}
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default CompanySidebar;