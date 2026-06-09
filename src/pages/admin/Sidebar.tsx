import { NavLink, useNavigate } from "react-router-dom";
import logo from "/images/logo.png"
import {
    LayoutDashboard,
    Building2,
    CheckCircle,
    Settings,
    LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const menus = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: <LayoutDashboard size={20} />,
        },
        {
            name: "Approve Companies",
            path: "/admin/approve-companies",
            icon: <CheckCircle size={20} />,
        },
        {
            name: "Companies",
            path: "/admin/companies",
            icon: <Building2 size={20} />,
        },
        {
            name: "Settings",
            path: "/admin/settings",
            icon: <Settings size={20} />,
        },
    ];

    // =========================
    // HANDLE LOGOUT
    // =========================

    const handleLogout = () => {

        logout();

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <div className="w-65 min-h-screen border-r border-border bg-background p-5">

            {/* LOGO */}
            <div className="mb-4 flex flex-row items-center">
                <img src={logo} alt="logo" className="w-20 mb-2" />
                <div>
                    <h1 className="text-3xl font-bold text-primary">
                        HireUp
                    </h1>
                    <p className="text-muted text-sm">
                        Admin Panel
                    </p>
                </div>

            </div>

            <div className="flex flex-col justify-between min-h-screen">
            {/* MENUS */}
            <div className="space-y-2">

                {menus.map((menu) => (
                    <NavLink
                        key={menu.path}
                        to={menu.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive
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

            {/* LOGOUT  */}
            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-950 transition cursor-pointer"
            >

                <LogOut size={20} />

                <span>Logout</span>

            </button>
            </div>
        </div>


    );
};

export default Sidebar;