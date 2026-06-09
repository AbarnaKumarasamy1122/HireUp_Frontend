import { useEffect, useState } from "react";

import {
  getCompanyApplications,
} from "../../services/authService";

const Applicants = () => {

  const user = JSON.parse(
    sessionStorage.getItem("user") || "{}"
  );

  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {

    const load = async () => {

      try {

        const res =
          await getCompanyApplications(user.id);

        setApps(res.data);

      } catch (err) {

        console.log(err);
      }
    };

    load();

  }, []);

  return (

    <div className="space-y-4">

      <h1 className="text-3xl font-bold">
        Applicants
      </h1>

      {apps.map((a) => (

        <div
          key={a.id}
          className="card p-5"
        >

          <h2 className="font-bold text-lg">
            {a.first_name} {a.last_name}
          </h2>

          <p>{a.email}</p>

          <p>{a.phone_number}</p>

          <p>{a.degree_details}</p>

          <p>
            Experience:
            {a.experience}
          </p>

          <p>
            Status:
            {a.status}
          </p>

          <a
            href={a.upload_cv}
            target="_blank"
            className="text-primary"
          >
            View CV
          </a>

        </div>
      ))}

    </div>
  );
};

export default Applicants;