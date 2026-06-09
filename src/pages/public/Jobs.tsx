import { useEffect, useMemo, useState } from "react";

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

const Jobs = () => {

  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const loadJobs = async () => {

    try {

      const res = await getAllJobs();

      setJobs(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    loadJobs();

  }, []);

  // FILTER JOBS
  const filteredJobs = useMemo(() => {

    return jobs.filter((job) => {

      const keyword = search.toLowerCase();

      return (
        job.title?.toLowerCase().includes(keyword) ||
        job.company_name?.toLowerCase().includes(keyword) ||
        job.location?.toLowerCase().includes(keyword)
      );
    });

  }, [jobs, search]);

  // DATE FORMAT
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
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search jobs, companies, locations..."
              className="w-full bg-transparent outline-none"
            />

          </div>

        </div>

      </section>

      {/* JOBS */}
      <section className="max-w-6xl mx-auto px-4 pb-10">

        {loading ? (

          <div className="text-center text-muted py-10">
            Loading jobs...
          </div>

        ) : filteredJobs.length === 0 ? (

          <div className="card p-10 text-center">

            <h2 className="text-2xl font-bold">
              No Jobs Found
            </h2>

            <p className="text-muted mt-2">
              Try searching with another keyword.
            </p>

          </div>

        ) : (

          <div className="grid gap-6">

            {filteredJobs.map((job) => (

              <div
                key={job.id}
                className="card p-6 hover:shadow-xl transition duration-300 fade-up"
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                  {/* LEFT */}
                  <div className="flex-1">

                    {/* TITLE */}
                    <h2 className="text-2xl font-bold">
                      {job.title}
                    </h2>

                    {/* COMPANY */}
                    <div className="flex items-center gap-2 mt-2 text-primary font-medium">

                      <Building2 size={18} />

                      <span>
                        {job.company_name}
                      </span>

                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-muted mt-4 line-clamp-3">
                      {job.description}
                    </p>

                    {/* INFO */}
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
                  <div className="flex flex-col gap-3 lg:min-w-45">

                    <button className="btn-primary w-full py-3 cursor-pointer">
                      Apply Now
                    </button>

                    <div className="flex items-center justify-center gap-2 text-sm text-muted">

                      <Clock3 size={15} />

                      Recently Posted

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