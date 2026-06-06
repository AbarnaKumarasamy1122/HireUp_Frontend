import { useState } from "react";
import logo from "/images/logo.png";
import { Search } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

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