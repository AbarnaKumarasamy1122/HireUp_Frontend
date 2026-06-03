import {
  Building2,
  MapPin,
  Users,
} from "lucide-react";

const companies = [
  {
    name: "Google",
    location: "California",
    employees: "100k+",
  },
  {
    name: "Microsoft",
    location: "Washington",
    employees: "200k+",
  },
  {
    name: "Adobe",
    location: "Remote",
    employees: "30k+",
  },
];

const Companies = () => {
  return (
    <div className="bg-background">

      {/* HERO */}
      <section className="text-center py-8 px-4 fade-up">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Top Companies
        </h1>

        <p className="text-muted mt-4">
          Explore companies hiring through HireUp.
        </p>
      </section>

      {/* COMPANIES */}
      <section className="max-w-6xl mx-auto px-4 py-4 grid md:grid-cols-3 gap-6">

        {companies.map((company) => (
          <div
            key={company.name}
            className="card p-6 hover:-translate-y-2 transition fade-up"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Building2 className="text-primary" size={30} />
            </div>

            <h2 className="text-2xl font-bold mt-5">
              {company.name}
            </h2>

            <div className="flex items-center gap-2 mt-3 text-muted">
              <MapPin size={16} />
              {company.location}
            </div>

            <div className="flex items-center gap-2 mt-2 text-muted">
              <Users size={16} />
              {company.employees} Employees
            </div>

            <button className="btn-primary mt-6 w-full">
              View Jobs
            </button>
          </div>
        ))}

      </section>
    </div>
  );
};

export default Companies;