import {
  Users,
  Briefcase,
  Building2,
} from "lucide-react";

const AdminDashboard = () => {

  const stats = [
    {
      title: "Candidates",
      count: 1250,
      icon: <Users size={28} />,
    },
    {
      title: "Employers",
      count: 320,
      icon: <Building2 size={28} />,
    },
    {
      title: "Jobs Posted",
      count: 840,
      icon: <Briefcase size={28} />,
    },
  ];

  return (
    <div className="fade-up">

      {/* <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1> */}

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {stats.map((item, index) => (
          <div
            key={index}
            className="card p-6"
          >

            <div className="flex items-center justify-between">

              <div>
                <p className="text-muted">
                  {item.title}
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {item.count}
                </h2>
              </div>

              <div className="bg-primary/10 text-primary p-4 rounded-xl">
                {item.icon}
              </div>

            </div>

          </div>
        ))}

      </div>

      {/* GRAPHS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">
            Candidate Growth
          </h2>

          <div className="h-[300px] flex items-center justify-center text-muted">
            Graph Here
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">
            Job Posting Analytics
          </h2>

          <div className="h-[300px] flex items-center justify-center text-muted">
            Graph Here
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;