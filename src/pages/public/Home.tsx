import { useNavigate } from "react-router-dom";

import {
  Search,
  Sparkles,
  Briefcase,
  Building2,
  Users,
  TrendingUp,
  FileText,
  Bell,
  MessageSquare,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";

import {
  MdLocationOn,
} from "react-icons/md";

const stats = [
  { label: "Active Jobs", value: "12k+", icon: Briefcase },
  { label: "Companies", value: "3.5k+", icon: Building2 },
  { label: "Candidates", value: "85k+", icon: Users },
  { label: "Hires Made", value: "24k+", icon: TrendingUp },
];

const features = [
  {
    icon: Sparkles,
    title: "AI Resume Matching",
    desc: "Smart job matching with AI scoring.",
  },
  {
    icon: FileText,
    title: "Resume Analyzer",
    desc: "ATS score + improvement suggestions.",
  },
  {
    icon: Bell,
    title: "Notifications",
    desc: "Instant job alerts & updates.",
  },
  {
    icon: MessageSquare,
    title: "Recruiter Chat",
    desc: "Direct communication with companies.",
  },
  {
    icon: CalendarCheck,
    title: "Interview Scheduling",
    desc: "Automated interview scheduling.",
  },
  {
    icon: TrendingUp,
    title: "Recommendations",
    desc: "Jobs tailored to your skills.",
  },
];

const categories = [
  { name: "Engineering", count: 2840 },
  { name: "Design", count: 1120 },
  { name: "Marketing", count: 980 },
  { name: "Data & AI", count: 1540 },
  { name: "Remote", count: 4210 },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background">

      {/* HERO */}
      <section className="px-4 py-8 sm:py-24 text-center max-w-5xl mx-auto fade-up">
        
        <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm">
          <Sparkles size={20} className="text-primary" />
          AI-Powered Hiring Platform
        </div>

        <h1 className="mt-6 text-3xl sm:text-5xl font-bold">
          Find your dream job with{" "}
          <span className="text-primary">HireUp</span>
        </h1>

        <p className="mt-4 text-muted">
          Smart recruitment platform for candidates and companies.
        </p>

        {/* SEARCH */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 border border-border p-3 rounded-xl bg-background shadow-sm hover:shadow-md transition">

          <div className="flex items-center gap-2 flex-1">
            <Search size={20} className="text-primary" />

            <input
              className="w-full bg-transparent"
              placeholder="Job title..."
            />
          </div>

          <div className="flex items-center gap-2 flex-1">
            <MdLocationOn size={24} className="text-primary" />

            <input
              className="w-full bg-transparent"
              placeholder="Location..."
            />
          </div>

          <button className="btn-primary">
            Search
          </button>

        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto py-10">

        {stats.map((s, i) => (
          <div
            key={s.label}
            className="card p-4 text-center hover:-translate-y-1 hover:shadow-md transition fade-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <s.icon className="mx-auto mb-2 text-primary" />

            <div className="font-bold text-xl">
              {s.value}
            </div>

            <div className="text-sm text-muted">
              {s.label}
            </div>
          </div>
        ))}

      </section>

      {/* FEATURES */}
      <section className="px-4 max-w-6xl mx-auto py-12">

        <h2 className="text-2xl font-bold text-center mb-8 fade-up">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {features.map((f, i) => (
            <div
              key={f.title}
              className="card p-5 hover:-translate-y-2 hover:shadow-lg transition fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <f.icon className="text-primary mb-3" />

              <h3 className="font-semibold">
                {f.title}
              </h3>

              <p className="text-sm text-muted">
                {f.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-4 max-w-6xl mx-auto py-12">

        <h2 className="text-2xl font-bold mb-6 fade-up">
          Browse Categories
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

          {categories.map((c, i) => (
            <div
              key={c.name}
              className="card p-4 flex justify-between items-center hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition fade-up cursor-pointer"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div>
                <div className="font-medium">
                  {c.name}
                </div>

                <div className="text-sm text-muted">
                  {c.count} jobs
                </div>
              </div>

              <ArrowRight size={18} />
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white text-center py-16 px-4 fade-up">

        <h2 className="text-3xl font-bold">
          Start Your Journey Today
        </h2>

        <p className="mt-2 opacity-80">
          Join thousands using HireUp
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">

          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-black px-6 py-2 rounded-lg cursor-pointer hover:scale-105 transition"
          >
            Create Account
          </button>

          <button
            onClick={() => navigate("/jobs")}
            className="border border-white px-6 py-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition"
          >
            Explore Jobs
          </button>

        </div>
      </section>
    </div>
  );
};

export default Home;