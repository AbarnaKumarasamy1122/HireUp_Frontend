import { useEffect, useState } from "react";
import { getMyApplications } from "../../services/authService";

const MyApplications = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getMyApplications().then(res => setApps(res.data));
  }, []);

  return (
    <div className="space-y-4">
      {apps.map((a: any) => (
        <div key={a.id} className="card p-4">
          <h2 className="font-bold">{a.job_title}</h2>
          <p>{a.company_name}</p>
          <p>Status: {a.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyApplications;