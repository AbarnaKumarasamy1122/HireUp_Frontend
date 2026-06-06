import { useEffect, useState } from "react";
import {
  getAllCompanies,
} from "../../services/authService";

const ViewCompanies = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [filter, setFilter] = useState("approved");

  const loadCompanies = async () => {
    const res = await getAllCompanies();
    setCompanies(res.data);
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const filteredCompanies = companies.filter((c) => {
    if (filter === "all") return true;
    return c.company_status === filter;
  });

  return (
    <div className="bg-background px-4 py-10">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">Company Management</h1>
        <p className="text-muted">Approve, reject or review companies</p>
      </div>

      {/* FILTER BUTTONS */}
      <div className="max-w-6xl mx-auto flex gap-3 mb-6 flex-wrap">

        {["approved", "rejected", "pending", "all"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg border cursor-pointer ${
              filter === status
                ? "bg-primary text-white"
                : "bg-background border-border"
            }`}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">

        {filteredCompanies.map((company) => (
          <div key={company.id} className="card p-5 hover:shadow-lg transition rounded-xl fade-up">

            {/* NAME + STATUS */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {company.company_name}
              </h2>

              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  company.company_status === "approved"
                    ? "bg-green-100 text-green-700"
                    : company.company_status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {company.company_status.toUpperCase()}
              </span>
            </div>

            {/* DETAILS */}
            <div className="mt-3 text-sm space-y-1">
              <p>{company.company_description}</p>
              <p className="flex items-center gap-2 mt-4">
                <span>📧</span> {company.email}
              </p>
              <p className="flex items-center gap-2">
                <span>📞</span> {company.company_contact}
              </p>
              <p className="flex items-center gap-2">
                <span>🌐</span> {company.company_website}
              </p>
              <p className="flex items-center gap-2">
                <span>📍</span> {company.company_address}
              </p>
            </div>

            {/* DOCUMENT */}
            {company.verified_document && (
              <a
                href={company.verified_document}
                target="_blank"
                className="text-primary underline text-sm mt-3 block"
              >
                View Document →
              </a>
            )}

          </div>
        ))}

      </div>
    </div>
  );
};

export default ViewCompanies;