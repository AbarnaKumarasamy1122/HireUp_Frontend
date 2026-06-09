import { useEffect, useState } from "react";

import {
  getCompanyAnalytics,
} from "../../services/authService";

const Analytics = () => {

  const user = JSON.parse(
    sessionStorage.getItem("user") || "{}"
  );

  const [data, setData] = useState<any>({});

  useEffect(() => {

    const fetchData = async () => {

      try {

        const res =
          await getCompanyAnalytics(user.id);

        setData(res.data);

      } catch (err) {

        console.log(err);
      }
    };

    fetchData();

  }, []);

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="card p-6">
          <h2>Total Jobs</h2>

          <p className="text-3xl font-bold">
            {data.jobs || 0}
          </p>
        </div>

        <div className="card p-6">
          <h2>Total Applications</h2>

          <p className="text-3xl font-bold">
            {data.applications || 0}
          </p>
        </div>

      </div>

    </div>
  );
};

export default Analytics;