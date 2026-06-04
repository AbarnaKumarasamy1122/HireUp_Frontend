import { NavLink } from "react-router-dom";
import logo from "/images/logo.png"
import {
    LayoutDashboard,
    Building2,
    CheckCircle,
    Settings,
} from "lucide-react";

const Sidebar = () => {

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

    return (
        <div className="w-65 min-h-screen border-r border-border bg-background p-5">

            {/* LOGO */}
            <div className="mb-10 flex flex-row items-center">
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
        </div>
    );
};

export default Sidebar;