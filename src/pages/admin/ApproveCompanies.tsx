import {
  useEffect,
  useState,
} from "react";

import {
  approveCompany,
  getPendingCompanies,
  rejectCompany
} from "../../services/authService";

const ApproveCompanies = () => {

  const [companies, setCompanies] =
    useState<any[]>([]);
  
  const loadCompanies = async () => {

    const res =
      await getPendingCompanies();

    setCompanies(res.data);
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleApprove = async (
    id: number
  ) => {

    await approveCompany(id);

    alert("Company is approved");

    loadCompanies();
  };

  const handleReject = async (id: number) => {
    await rejectCompany(id);
    alert("Company is rejected");
    loadCompanies();
  };

  return (
    <div className="bg-background px-4 py-10">
      
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Approve Companies
        </h1>
        <p className="text-muted mt-2">
          Review and approve pending company registrations
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {companies.map((company) => (
          <div
            key={company.id}
            className="card p-5 hover:shadow-lg transition"
          >
            {/* TITLE */}
            <h2 className="text-xl font-bold text-foreground">
              {company.company_name}
            </h2>

            <p className="text-muted text-sm mt-1">
              {company.company_description}
            </p>

            {/* INFO */}
            <div className="mt-4 space-y-2 text-sm">
              <p>📧 {company.email}</p>
              <p>📞 {company.company_contact}</p>
              <p>🌐 {company.company_website}</p>
              <p>📍 {company.company_address}</p>
            </div>

            {/* DOCUMENT */}
            <a
              href={company.verified_document}
              target="_blank"
              className="inline-block mt-4 text-primary underline text-sm"
            >
              View Verification Document →
            </a>

          <div className="flex flex-row justify-between gap-4 mt-6">
            <button
              onClick={() => handleApprove(company.id)}
              className="bg-green-400 w-full text-white px-4 py-2 mt-2 rounded-lg hover:opacity-90 transition cursor-pointer"
            >
              Approve Company
            </button>

            {/* BUTTON */}
            <button
              onClick={() => handleReject(company.id)}
              className="bg-red-400 w-full text-white px-4 py-2 mt-2 rounded-lg hover:opacity-90 transition cursor-pointer"
            >
              Reject Company
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApproveCompanies;
