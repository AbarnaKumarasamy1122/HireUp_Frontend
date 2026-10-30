import {
  Sparkles,
  Users,
  Briefcase,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getPublicStatistics } from "../../services/authService";
import { useToast } from "../../components/Toast";

const values = [
  {
    icon: Sparkles,
    title: "AI-Powered Hiring",
    desc: "Smart recommendations and resume analysis.",
  },
  {
    icon: Users,
    title: "Candidate First",
    desc: "Helping job seekers find the right opportunities.",
  },
  {
    icon: Briefcase,
    title: "Top Companies",
    desc: "Connect with trusted recruiters and businesses.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    desc: "Protected accounts and verified companies.",
  },
];

const About = () => {
  const toast = useToast();
  const [stats, setStats] = useState([
    { label: "Candidates", value: "..." },
    { label: "Companies", value: "..." },
    { label: "Active Jobs", value: "..." },
    { label: "Successful Hires", value: "..." },
  ]);

  useEffect(() => {
    getPublicStatistics()
      .then(({ data }) => {
        const format = (value: number) => value.toLocaleString();
        setStats([
          { label: "Candidates", value: format(data.candidates) },
          { label: "Companies", value: format(data.companies) },
          { label: "Active Jobs", value: format(data.active_jobs) },
          { label: "Successful Hires", value: format(data.hires) },
        ]);
      })
      .catch(() => toast.error("Unable to load platform statistics"));
  }, []);

  return (
    <div className="bg-background">
      {/* HERO */}
      <section className="text-center py-8 px-4 max-w-5xl mx-auto fade-up">
        <h1 className="text-4xl sm:text-5xl font-bold">
          About <span className="text-primary">HireUp</span>
        </h1>

        <p className="mt-6 text-lg text-muted">
          HireUp is an AI-powered recruitment platform helping
          candidates discover opportunities and companies hire
          smarter and faster.
        </p>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 py-4">
        {stats.map((item) => (
          <div key={item.label} className="card p-6 text-center fade-up">
            <div className="text-3xl font-bold text-primary">
              {item.value}
            </div>

            <div className="text-muted mt-2">
              {item.label}
            </div>
          </div>
        ))}
      </section>

      {/* VALUES */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 fade-up">
          Why Choose HireUp?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="card p-6 hover:-translate-y-2 transition fade-up"
            >
              <value.icon className="text-primary mb-4" size={30} />

              <h3 className="font-semibold text-lg">
                {value.title}
              </h3>

              <p className="text-muted mt-2 text-sm">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-primary text-white py-20 px-4 text-center fade-up">
        <TrendingUp size={50} className="mx-auto mb-5" />

        <h2 className="text-4xl font-bold">
          Our Mission
        </h2>

        <p className="max-w-3xl mx-auto mt-6 text-lg opacity-90">
          We aim to simplify recruitment using AI technology,
          making hiring more efficient and helping candidates
          achieve their dream careers.
        </p>
      </section>
    </div>
  );
};

export default About;