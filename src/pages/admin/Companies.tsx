const Companies = () => {

  const companies = [
    "Google",
    "Microsoft",
    "OpenAI",
    "Netflix",
  ];

  return (
    <div className="fade-up">

      <h1 className="text-3xl font-bold mb-6">
        All Companies
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {companies.map((company, index) => (
          <div
            key={index}
            className="card p-5"
          >

            <h2 className="text-xl font-semibold">
              {company}
            </h2>

            <p className="text-muted mt-2">
              Active hiring company
            </p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Companies;