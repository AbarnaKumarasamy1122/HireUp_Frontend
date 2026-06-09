import { useState } from "react";
import {
  Briefcase,
  MapPin,
  Wallet,
  CalendarDays,
  FileText,
  Building2,
} from "lucide-react";

import { createJob } from "../../services/authService";

const PostJob = () => {

  const user = JSON.parse(
    sessionStorage.getItem("user") || "{}"
  );

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location_type: "remote",
    location: "",
    salary: "",
    deadline: "",
  });

  const submit = async () => {

    try {

      setLoading(true);

      await createJob({
        company_id: user.id,
        ...form,
      });

      alert("Job posted successfully");

      setForm({
        title: "",
        description: "",
        location_type: "remote",
        location: "",
        salary: "",
        deadline: "",
      });

    } catch (err) {

      console.log(err);

      alert("Failed to post job");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="fade-up w-full">

      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-2">

        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary p-3 rounded-xl">
            <Building2 size={28} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Post New Job
            </h1>

            <p className="text-muted mt-1">
              Create a professional job posting and reach top candidates.
            </p>
          </div>
        </div>

      </div>

      {/* FORM CARD */}
      <div className="card p-6 sm:p-8 max-w-5xl fade-up">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* JOB TITLE */}
          <div className="md:col-span-2">

            <label className="font-medium mb-2 block">
              Job Title
            </label>

            <div className="relative">

              <Briefcase
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                value={form.title}
                className="w-full border border-border rounded-xl bg-background pl-11 pr-4 py-3 focus:ring-2 focus:ring-primary/30"
                placeholder="Frontend Developer"
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />

            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2">

            <label className="font-medium mb-2 block">
              Job Description
            </label>

            <div className="relative">

              <FileText
                size={18}
                className="absolute left-4 top-4 text-muted"
              />

              <textarea
                rows={6}
                value={form.description}
                className="w-full border border-border rounded-xl bg-background pl-11 pr-4 py-3 resize-none focus:ring-2 focus:ring-primary/30"
                placeholder="Describe responsibilities, skills, and requirements..."
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />

            </div>

          </div>

          {/* LOCATION TYPE */}
          <div>

            <label className="font-medium mb-2 block">
              Work Type
            </label>

            <select
              value={form.location_type}
              className="w-full border border-border rounded-xl bg-background px-4 py-3 focus:ring-2 focus:ring-primary/30"
              onChange={(e) =>
                setForm({
                  ...form,
                  location_type: e.target.value,
                })
              }
            >

              <option value="remote">
                Remote
              </option>

              <option value="onsite">
                Onsite
              </option>

              <option value="hybrid">
                Hybrid
              </option>

            </select>

          </div>

          {/* LOCATION */}
          <div>

            <label className="font-medium mb-2 block">
              Location
            </label>

            <div className="relative">

              <MapPin
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                value={form.location}
                className="w-full border border-border rounded-xl bg-background pl-11 pr-4 py-3 focus:ring-2 focus:ring-primary/30"
                placeholder="Colombo, Sri Lanka"
                onChange={(e) =>
                  setForm({
                    ...form,
                    location: e.target.value,
                  })
                }
              />

            </div>

          </div>

          {/* SALARY */}
          <div>

            <label className="font-medium mb-2 block">
              Salary
            </label>

            <div className="relative">

              <Wallet
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                value={form.salary}
                className="w-full border border-border rounded-xl bg-background pl-11 pr-4 py-3 focus:ring-2 focus:ring-primary/30"
                placeholder="LKR 150,000/month"
                onChange={(e) =>
                  setForm({
                    ...form,
                    salary: e.target.value,
                  })
                }
              />

            </div>

          </div>

          {/* DEADLINE */}
          <div>

            <label className="font-medium mb-2 block">
              Application Deadline
            </label>

            <div className="relative">

              <CalendarDays
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                type="date"
                value={form.deadline}
                className="w-full border border-border rounded-xl bg-background pl-11 pr-4 py-3 focus:ring-2 focus:ring-primary/30"
                onChange={(e) =>
                  setForm({
                    ...form,
                    deadline: e.target.value,
                  })
                }
              />

            </div>

          </div>

        </div>

        {/* BUTTON */}
        <div className="mt-8 flex justify-end">

          <button
            className="btn-primary w-full sm:w-auto px-8 py-3 text-lg font-medium"
            onClick={submit}
            disabled={loading}
          >

            {loading
              ? "Posting Job..."
              : "Post Job"}

          </button>

        </div>

      </div>

    </div>
  );
};

export default PostJob;