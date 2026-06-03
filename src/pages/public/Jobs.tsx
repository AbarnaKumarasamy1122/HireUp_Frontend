import {
  MapPin,
  Briefcase,
  Clock3,
  Search,
} from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    location: "Remote",
    type: "Full Time",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Microsoft",
    location: "New York",
    type: "Hybrid",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Adobe",
    location: "Remote",
    type: "Part Time",
  },
];

const Jobs = () => {
  return (
    <div className="bg-background">

      {/* HERO */}
      <section className="text-center py-8 px-4 fade-up">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Find Your Dream Job
        </h1>

        <p className="text-muted mt-4">
          Discover thousands of opportunities worldwide.
        </p>

        {/* SEARCH */}
        <div className="max-w-4xl mx-auto mt-8 flex flex-col md:flex-row gap-3 border border-border p-3 rounded-xl shadow-sm">

          <div className="flex items-center gap-2 flex-1">
            <Search className="text-primary" />
            <input
              placeholder="Search jobs..."
              className="w-full"
            />
          </div>

          <button className="btn-primary">
            Search
          </button>
        </div>
      </section>

      {/* JOBS */}
      <section className="max-w-6xl mx-auto px-4 py-4 grid gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="card p-6 hover:shadow-lg transition fade-up"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>
                <h2 className="text-2xl font-bold">
                  {job.title}
                </h2>

                <p className="text-primary font-medium">
                  {job.company}
                </p>

                <div className="flex lg:flex-row md:flex-row flex-col gap-4 mt-3 text-sm text-muted">

                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    {job.location}
                  </div>

                  <div className="flex items-center gap-1">
                    <Briefcase size={16} />
                    {job.type}
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock3 size={16} />
                    Posted 2 days ago
                  </div>

                </div>
              </div>

              <button className="btn-primary">
                Apply Now
              </button>

            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Jobs;