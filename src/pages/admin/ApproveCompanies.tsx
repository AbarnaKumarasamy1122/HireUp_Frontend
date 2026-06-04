const ApproveCompanies = () => {

  const companies = [
    {
      id: 1,
      name: "TechNova",
      email: "hr@technova.com",
    },
    {
      id: 2,
      name: "HireAI",
      email: "contact@hireai.com",
    },
  ];

  return (
    <div className="fade-up">

      <h1 className="text-3xl font-bold mb-6">
        Approve Companies
      </h1>

      <div className="space-y-4">

        {companies.map((company) => (
          <div
            key={company.id}
            className="card p-5 flex items-center justify-between"
          >

            <div>
              <h2 className="font-semibold text-lg">
                {company.name}
              </h2>

              <p className="text-muted text-sm">
                {company.email}
              </p>
            </div>

            <button className="btn-primary">
              Approve
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default ApproveCompanies;