import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/images/logo.png";
import { ChevronDown, LogOut, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getDashboardPath = () => {
    if (user?.role === "admin") return "/admin/dashboard";
    if (user?.role === "company") return `/company/${user.id}/dashboard`;
    return `/candidate/${user.id}/dashboard`;
  };

  const displayName =
    user?.company_name ||
    [user?.first_name, user?.last_name].filter(Boolean).join(" ") ||
    user?.username ||
    user?.email ||
    "User";
  const role = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "";
  const initials = displayName
    .split(" ")
    .map((part: string) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (user) {
    return (
      <nav className="relative z-40 border-b border-border bg-background">
        <div className="mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate(getDashboardPath())}
            aria-label="Go to dashboard"
          >
            <img src={logo} alt="HireUp Logo" className="h-12 w-12 rounded-lg" />
            <span className="text-xl font-bold text-primary">HireUp</span>
          </button>

          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-100 cursor-pointer"
              onClick={() => setProfileOpen((isOpen) => !isOpen)}
              aria-expanded={profileOpen}
              aria-haspopup="menu"
            >
              {user.profile_image ? (
                <img
                  src={user.profile_image}
                  alt={`${displayName} profile`}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-white">
                  {initials}
                </span>
              )}
              <span className="hidden text-left sm:block">
                <span className="block max-w-40 truncate text-sm font-semibold">
                  {displayName}
                </span>
                <span className="block text-xs text-muted">{role}</span>
              </span>
              <ChevronDown
                size={18}
                className={`text-muted transition-transform ${profileOpen ? "rotate-180" : ""}`}
              />
            </button>

            {profileOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-background p-2 shadow-lg"
                role="menu"
              >
                <div className="border-b border-border px-3 py-2 sm:hidden">
                  <p className="truncate text-sm font-semibold">{displayName}</p>
                  <p className="text-xs text-muted">{role}</p>
                </div>
                <button
                  type="button"
                  className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                  onClick={logout}
                  role="menuitem"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-b border-border bg-background relative">
      <div className="mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* ================= LOGO ================= */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = "/"}>
          <img src={logo} alt="HireUp Logo" className="w-12 h-12 rounded-lg" />
          <h1 className="text-xl font-bold text-primary">HireUp</h1>
        </div>

        {/* ================= DESKTOP MENU (ONLY LG+) ================= */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <a href="/" className="hover:text-primary transition">Home</a>
          <a href="/about" className="hover:text-primary transition">About</a>
          <a href="/jobs" className="hover:text-primary transition">Jobs</a>
          <a href="/companies" className="hover:text-primary transition">Companies</a>
          <a href="/contact" className="hover:text-primary transition">Contact</a>
        </div>

        {/* ================= RIGHT ACTIONS (ONLY LG+) ================= */}
        <div className="hidden lg:flex items-center gap-3">

          <div className="flex items-center gap-2 border border-border px-3 py-1 rounded-lg">
            <Search size={16} className="text-muted" />
            <input
              placeholder="Search jobs..."
              className="bg-transparent text-sm outline-none w-40 p-1"
            />
          </div>

          <a href="/login" className="text-sm hover:text-primary transition">
            Login
          </a>

          <a
            href="/signup"
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
          >
            Signup
          </a>

        </div>

        {/* ================= HAMBURGER (MD + SM) ================= */}
        <button
          className="lg:hidden text-3xl cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {/* ================= MOBILE / TABLET MENU ================= */}
      {open && (
        <div className="lg:hidden px-4 pb-4 flex flex-col gap-3 text-sm border-t border-border bg-background">

          <a href="/" className="py-2">Home</a>
          <a href="/about" className="py-2">About</a>
          <a href="/jobs" className="py-2">Jobs</a>
          <a href="/companies" className="py-2">Companies</a>
          <a href="/contact" className="py-2">Contact</a>

          <div className="flex flex-col gap-2 pt-3">

            <a
              href="/login"
              className="border border-border px-3 py-2 rounded-lg text-center"
            >
              Login
            </a>

            <a
              href="/signup"
              className="bg-primary text-white px-3 py-2 rounded-lg text-center"
            >
              Signup
            </a>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;