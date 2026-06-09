import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getCompanyAnalytics,
  getCompanyProfile,
} from "../../services/authService";

const CompanyDashboard = () => {

  const { id } = useParams();

  const [stats, setStats] = useState<any>({});
  const [company, setCompany] = useState<any>(null);

  useEffect(() => {

    if (!id) return;

    const fetchData = async () => {

      try {

        const analytics =
          await getCompanyAnalytics(Number(id));

        setStats(analytics.data);

        const profile =
          await getCompanyProfile(Number(id));

        setCompany(profile.data);

      } catch (err) {

        console.log(err);
      }
    };

    fetchData();

  }, [id]);

  return (
    <div className="space-y-6 fade-up">

      <div>
        <h1 className="text-3xl font-bold">
          Welcome {company?.company_name}
        </h1>

        <p className="text-muted">
          Manage your company jobs and applicants
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">

        <div className="card p-5">
          <h2 className="text-muted">
            Total Jobs
          </h2>

          <p className="text-3xl font-bold mt-2">
            {stats.jobs || 0}
          </p>
        </div>

        <div className="card p-5">
          <h2 className="text-muted">
            Applications
          </h2>

          <p className="text-3xl font-bold mt-2">
            {stats.applications || 0}
          </p>
        </div>

        <div className="card p-5">
          <h2 className="text-muted">
            Pending
          </h2>

          <p className="text-3xl font-bold mt-2">
            {stats.pending || 0}
          </p>
        </div>

      </div>

    </div>
  );
};

export default CompanyDashboard;