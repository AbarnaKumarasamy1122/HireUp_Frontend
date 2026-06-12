import { NavLink, useNavigate } from "react-router-dom";
import logo from "/images/logo.png";
import {
  LayoutDashboard,
  Building2,
  CheckCircle,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface AdminSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

const AdminSidebar = ({ open = false, onClose }: AdminSidebarProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menus = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Approve Companies", path: "/admin/approve-companies", icon: <CheckCircle size={20} /> },
    { name: "Companies", path: "/admin/companies", icon: <Building2 size={20} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
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
          border-r border-border bg-background p-5
          flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Close button (mobile only) */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-3 right-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        {/* LOGO */}
        <div className="mb-6 flex flex-row items-center gap-2">
          <img src={logo} alt="logo" className="w-16" />
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-primary truncate">HireUp</h1>
            <p className="text-muted text-sm">Admin Panel</p>
          </div>
        </div>

        {/* MENUS */}
        <div className="flex-1 space-y-2 overflow-y-auto">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`
              }
            >
              {menu.icon}
              <span>{menu.name}</span>
            </NavLink>
          ))}
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-950 transition cursor-pointer"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
};

export default AdminSidebar;
