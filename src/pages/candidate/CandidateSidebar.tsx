import { NavLink, useParams } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  User,
  FileText,
  Briefcase,
  Bell,
  CalendarDays,
  LogOut,
  X,
} from "lucide-react";

import logo from "/images/logo.png";
import { useAuth } from "../../context/AuthContext";

interface CandidateSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

const CandidateSidebar = ({
  open = false,
  onClose,
}: CandidateSidebarProps) => {
  const { id } = useParams();
  const { logout } = useAuth();

  const menus = [
    {
      name: "Dashboard",
      path: `/candidate/${id}/dashboard`,
      icon: <LayoutDashboard size={20} />,
    },
    {
        name: "Browse Jobs",
        path: `/candidate/${id}/browse-jobs`,
        icon: <Search size={20} />,
    },
    {
      name: "My Applications",
      path: `/candidate/${id}/applications`,
      icon: <Briefcase size={20} />,
    },
    {
      name: "Interviews",
      path: `/candidate/${id}/interviews`,
      icon: <CalendarDays size={20} />,
    },  
    {
      name: "Resume Upload",
      path: `/candidate/${id}/resume`,
      icon: <FileText size={20} />,
    },
    {
      name: "Saved Jobs",
      path: `/candidate/${id}/saved-jobs`,
      icon: <Briefcase size={20} />,
    },
    {
      name: "Notifications",
      path: `/candidate/${id}/notifications`,
      icon: <Bell size={20} />,
    },   
    {
      name: "Profile",
      path: `/candidate/${id}/profile`,
      icon: <User size={20} />,
    }
  ];

  return (
    <>
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 cursor-pointer"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50
        w-64 h-screen border-r border-border bg-background
        flex flex-col transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <button
          onClick={onClose}
          className="lg:hidden absolute top-3 right-3 cursor-pointer"
        >
          <X />
        </button>

        <div className="p-5 border-b border-border flex items-center gap-2">
          <img src={logo} className="w-16" />
          <div>
            <h1 className="text-2xl font-bold text-primary">
              HireUp
            </h1>
            <p className="text-sm text-muted">
              Candidate Panel
            </p>
          </div>
        </div>

        <div className="flex-1 p-3 space-y-2">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`
              }
            >
              {menu.icon}
              {menu.name}
            </NavLink>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default CandidateSidebar;
