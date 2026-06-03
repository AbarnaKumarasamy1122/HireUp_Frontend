import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

import {
  MdEmail,
  MdPhone,
  MdLocationOn,
} from "react-icons/md";

import logo from "/images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 mt-10">

      {/* TOP */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">

        {/* BRAND */}
        <div>

          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = "/"}>
            <img src={logo} alt="HireUp Logo" className="w-12 h-12" />
            <h2 className="text-2xl font-bold text-white">
              HireUp
            </h2>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-400">
            AI-powered recruitment platform helping candidates
            discover opportunities and companies hire smarter.
          </p>

          {/* SOCIALS */}
          <div className="flex gap-4 mt-6">

            <a
              href="#"
              className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary transition"
            >
              <FaFacebook size={18} />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary transition"
            >
              <FaTwitter size={18} />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary transition"
            >
              <FaLinkedin size={18} />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary transition"
            >
              <FaInstagram size={18} />
            </a>

          </div>

        </div>

        {/* QUICK LINKS */}
        <div>

          <h3 className="text-lg font-semibold text-white mb-5">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-sm">

            <a href="/" className="hover:text-primary transition">
              Home
            </a>

            <a href="/about" className="hover:text-primary transition">
              About
            </a>

            <a href="/jobs" className="hover:text-primary transition">
              Jobs
            </a>

            <a href="/companies" className="hover:text-primary transition">
              Companies
            </a>

            <a href="/contact" className="hover:text-primary transition">
              Contact
            </a>

          </div>

        </div>

        {/* SERVICES */}
        <div>

          <h3 className="text-lg font-semibold text-white mb-5">
            Services
          </h3>

          <div className="flex flex-col gap-3 text-sm">

            <p className="hover:text-primary transition cursor-pointer">
              AI Resume Matching
            </p>

            <p className="hover:text-primary transition cursor-pointer">
              Job Recommendations
            </p>

            <p className="hover:text-primary transition cursor-pointer">
              Interview Scheduling
            </p>

            <p className="hover:text-primary transition cursor-pointer">
              Recruiter Chat
            </p>

            <p className="hover:text-primary transition cursor-pointer">
              Career Guidance
            </p>

          </div>

        </div>

        {/* CONTACT */}
        <div>

          <h3 className="text-lg font-semibold text-white mb-5">
            Contact Info
          </h3>

          <div className="space-y-4 text-sm">

            <div className="flex items-center gap-3">
              <MdEmail size={18} className="text-primary" />

              <span>support@hireup.com</span>
            </div>

            <div className="flex items-center gap-3">
              <MdPhone size={18} className="text-primary" />

              <span>+94 77 123 4567</span>
            </div>

            <div className="flex items-center gap-3">
              <MdLocationOn size={18} className="text-primary" />

              <span>Jaffna, Sri Lanka</span>
            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-500">

          <p>
            © 2026 HireUp. All rights reserved.
          </p>

          <div className="flex gap-5">

            <a href="#" className="hover:text-primary transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-primary transition">
              Terms of Service
            </a>

            <a href="#" className="hover:text-primary transition">
              Cookies
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;