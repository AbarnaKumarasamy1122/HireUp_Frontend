import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  Clock3,
  Search,
  Wallet,
  CalendarDays,
  Building2,
} from "lucide-react";

import { getAllJobs } from "../../services/authService";
import { useToast } from "../../components/Toast";

const Jobs = () => {

  const toast = useToast();

  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const loadJobs = async () => {
    try {
      const res = await getAllJobs();
      setJobs(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // FILTER JOBS
  const filteredJobs = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return jobs.filter((job) => {
      const deadline = new Date(job.deadline);
      deadline.setHours(0, 0, 0, 0);

      if (deadline < today) return false;

      const keyword = search.toLowerCase();

      return (
        job.title?.toLowerCase().includes(keyword) ||
        job.company_name?.toLowerCase().includes(keyword) ||
        job.location?.toLowerCase().includes(keyword)
      );
    });

  }, [jobs, search]);

  const getPostedTime = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();

    const diffMs = now.getTime() - created.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 30) return `${diffDays} days ago`;

    const months = Math.floor(diffDays / 30);
    if (months < 12) return `${months} months ago`;

    const years = Math.floor(months / 12);
    return `${years} years ago`;
  };

  // ✅ FIXED APPLY LOGIC
  const handleApply = (job: any) => {

    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");

    // ❌ NOT LOGGED IN
    if (!token) {
      toast.info("Please login as a candidate to apply for jobs.");

      setTimeout(() => {
        navigate("/login");
      }, 800);

      return;
    }

    // ❌ LOGGED IN BUT NOT CANDIDATE
    if (user.role !== "candidate") {
      toast.info("Only candidates can apply for jobs.");
      return;
    }

    // ✅ ALLOW APPLY
    navigate(`/jobs/${job.id}`);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-background min-h-screen">

      {/* HERO */}
      <section className="text-center py-10 px-4 fade-up">

        <h1 className="text-4xl sm:text-5xl font-bold">
          Find Your Dream Job
        </h1>

        <p className="text-muted mt-4">
          Discover opportunities from top companies.
        </p>

        {/* SEARCH */}
        <div className="max-w-4xl mx-auto mt-8">

          <div className="flex items-center gap-3 border border-border rounded-2xl px-4 py-4 bg-background shadow-sm">

            <Search className="text-primary" size={22} />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs, companies, locations..."
              className="w-full bg-transparent outline-none"
            />

          </div>

        </div>
      </section>

      {/* JOB LIST */}
      <section className="max-w-6xl mx-auto px-4 pb-10">

        {loading ? (
          <div className="text-center text-muted py-10">
            Loading jobs...
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="card p-10 text-center">
            <h2 className="text-2xl font-bold">No Jobs Found</h2>
            <p className="text-muted mt-2">
              Try searching with another keyword.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">

            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="card p-6 hover:shadow-xl transition"
              >

                <div className="flex flex-col lg:flex-row justify-between gap-6">

                  {/* LEFT */}
                  <div>

                    <h2 className="text-2xl font-bold">
                      {job.title}
                    </h2>

                    <div className="flex items-center gap-2 mt-2 text-primary font-medium">
                      <Building2 size={18} />
                      {job.company_name}
                    </div>

                    <p className="text-muted mt-4 line-clamp-3">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-5 mt-5 text-sm text-muted">

                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        {job.location || "Remote"}
                      </div>

                      <div className="flex items-center gap-2 capitalize">
                        <Briefcase size={16} />
                        {job.location_type}
                      </div>

                      <div className="flex items-center gap-2">
                        <Wallet size={16} />
                        {job.salary || "Negotiable"}
                      </div>

                      <div className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        Deadline: {formatDate(job.deadline)}
                      </div>

                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col justify-center gap-3 lg:min-w-45">

                    <button
                      onClick={() => handleApply(job)}
                      className="btn-primary w-full py-3 cursor-pointer"
                    >
                      Apply Now
                    </button>

                    <div className="flex items-center justify-center gap-2 text-sm text-muted">
                      <Clock3 size={15} />
                      Posted {getPostedTime(job.created_at)}
                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
};

export default Jobs;