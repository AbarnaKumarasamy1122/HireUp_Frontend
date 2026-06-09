import { useEffect, useState } from "react";
import { Building2, MapPin, Users } from "lucide-react";
import { getAllCompanies } from "../../services/authService";

const Companies = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const res = await getAllCompanies();

      // ✅ ONLY APPROVED COMPANIES
      const approved = res.data.filter(
        (c: any) => c.company_status === "approved"
      );

      setCompanies(approved);
    } catch (err) {
      console.log("Failed to load companies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  return (
    <div className="bg-background">

      {/* HERO */}
      <section className="text-center py-10 px-4 fade-up">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Top Companies
        </h1>

        <p className="text-muted mt-4">
          Explore verified companies hiring through HireUp.
        </p>
      </section>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-muted py-10">
          Loading companies...
        </p>
      )}

      {/* EMPTY STATE */}
      {!loading && companies.length === 0 && (
        <p className="text-center text-muted py-10">
          No approved companies found.
        </p>
      )}

      {/* GRID */}
      <section className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 gap-6">

  {companies.map((company) => (
    <div
      key={company.id}
      className="card p-6 hover:-translate-y-2 hover:shadow-lg transition fade-up flex flex-col h-full"
    >

        {/* ICON */}
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Building2 className="text-primary" size={30} />
        </div>

        {/* NAME */}
        <h2 className="text-2xl font-bold mt-5">
          {company.company_name}
        </h2>

        {/* LOCATION */}
        <div className="flex items-center gap-2 mt-3 text-muted">
          <MapPin size={16} />
          {company.company_address || "Not specified"}
        </div>

        {/* CONTACT */}
        <div className="flex items-center gap-2 mt-2 text-muted">
          <Users size={16} />
          {company.company_contact || "N/A"}
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-muted mt-4 line-clamp-3">
          {company.company_description}
        </p>

        {/* WEBSITE */}
        {company.company_website && (
          <a
            href={company.company_website}
            target="_blank"
            rel="noreferrer"
            className="text-primary underline text-sm mt-4 block"
          >
            Visit Website →
          </a>
        )}
      </div>

  ))}
</section>
    </div>
  );
};

export default Companies;