import { useEffect, useState } from "react";

import {
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  MapPin,
  Wallet,
  CalendarDays,
  FileText,
  User,
} from "lucide-react";

import {
  getCompanyApplications,
} from "../../services/authService";


const CompanyApplicants = () => {

  const user = JSON.parse(
    sessionStorage.getItem("user") || "{}"
  );


  const [applications, setApplications] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    const loadApplications = async () => {

      try {

        const res =
          await getCompanyApplications(user.id);

        setApplications(res.data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };


    loadApplications();

  }, []);


  const formatDate = (date: string) => {

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };


  return (

    <div className="space-y-6 fade-up">

      <div>
        <h1 className="text-3xl font-bold">
          Applicants
        </h1>

        <p className="text-muted">
          Candidates who applied for your jobs
        </p>
      </div>


      {loading ? (

        <div className="card p-8 text-center">
          Loading applicants...
        </div>

      ) : applications.length === 0 ? (

        <div className="card p-8 text-center">
          No applications received yet.
        </div>

      ) : (

        applications.map((app) => (

          <div
            key={app.id}
            className="card p-6 space-y-5"
          >

            {/* Candidate */}
            <div>

              <h2 className="text-xl font-bold flex items-center gap-2">

                <User size={20} />

                {app.first_name}
                {" "}
                {app.last_name}

              </h2>


              <div className="mt-3 space-y-2 text-muted">

                <p className="flex gap-2">
                  <Mail size={16}/>
                  {app.email}
                </p>


                <p className="flex gap-2">
                  <Phone size={16}/>
                  {app.contact_number}
                </p>


                <p className="flex gap-2">
                  <MapPin size={16}/>
                  {app.address}
                </p>

              </div>

            </div>


            {/* Resume */}
            {
              app.resume_url &&
              <div>

                <h3 className="font-semibold mb-2">
                  Resume Preview
                </h3>

                <iframe
                  src={`${app.resume_url}#toolbar=0`}
                  className="
                    w-full
                    h-[500px]
                    border
                    rounded-xl
                  "
                />

              </div>
            }


            {/* Job */}
            <div className="border-t pt-4">

              <h3 className="font-bold text-lg">
                Applied Job
              </h3>


              <p className="mt-2 font-semibold">
                {app.job_title}
              </p>


              <p className="text-muted mt-2">
                {app.job_description}
              </p>


              <div className="
                flex
                flex-wrap
                gap-4
                mt-4
                text-sm
              ">

                <span className="flex gap-2">
                  <Briefcase size={16}/>
                  {app.location_type}
                </span>


                <span className="flex gap-2">
                  <Wallet size={16}/>
                  {app.salary || "Negotiable"}
                </span>


                <span className="flex gap-2">
                  <CalendarDays size={16}/>
                  {formatDate(app.deadline)}
                </span>

              </div>

            </div>


            {/* Application Details */}
            <div className="border-t pt-4">

              <h3 className="font-bold text-lg">
                Candidate Details
              </h3>


              <div className="space-y-2 mt-3">

                <p>
                  <GraduationCap className="inline mr-2" size={16}/>
                  Degree:
                  {" "}
                  {app.degree}
                </p>


                <p>
                  <Briefcase className="inline mr-2" size={16}/>
                  Experience:
                  {" "}
                  {app.experience}
                </p>


                <p>
                  <Wallet className="inline mr-2" size={16}/>
                  Expected Salary:
                  {" "}
                  {app.expected_salary}
                </p>


                <p>
                  <FileText className="inline mr-2" size={16}/>
                  Skills:
                  {" "}
                  {app.skills}
                </p>


                <div>
                  <p className="font-semibold">
                    Cover Letter
                  </p>

                  <p className="text-muted mt-1">
                    {app.cover_letter}
                  </p>

                </div>

              </div>

            </div>


          </div>

        ))

      )}

    </div>

  );

};


export default CompanyApplicants;