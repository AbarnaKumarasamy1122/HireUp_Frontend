import { useEffect, useState } from "react";
import {
  getCompanyJobs,
  deleteJob,
  updateJob,
} from "../../services/authService";

import {
  Pencil,
  Trash2,
  Eye,
  X,
  MapPin,
  Wallet,
  Calendar,
  Briefcase,
} from "lucide-react";

const emptyJob = {
  title: "",
  description: "",
  salary: "",
  location: "",
  location_type: "",
  deadline: "",
};

const ManageJobs = () => {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<any>(emptyJob);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getCompanyJobs(user.id);
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // lock scroll
  useEffect(() => {
    document.body.style.overflow = selectedJob ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [selectedJob]);

  const closeModal = () => {
    setSelectedJob(null);
    setEditMode(false);
    setEditForm(emptyJob);
  };

  const remove = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    await deleteJob(id);
    load();
  };

  const openEdit = (job: any) => {
    setSelectedJob(job);
    setEditMode(true);
    setEditForm(job);
  };

  const openView = (job: any) => {
    setSelectedJob(job);
    setEditMode(false);
  };

  const saveEdit = async () => {
    await updateJob(selectedJob.id, editForm);
    closeModal();
    load();
  };

  return (
    <div className="fade-up space-y-6 relative z-0">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Manage Jobs</h1>
        <p className="text-muted">View, edit, and manage your postings</p>
      </div>

      {/* LOADING */}
      {loading && <p className="text-muted">Loading jobs...</p>}

      {/* JOB CARDS */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="card p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-md transition"
          >
            <div className="space-y-1">
              <h2 className="text-lg font-bold">{job.title}</h2>
              <p className="text-muted text-sm line-clamp-2">
                {job.description}
              </p>

              <div className="flex flex-col flex-wrap gap-3 text-sm text-muted mt-2">
                <span className="flex items-center gap-1 capitalize">
                  <Briefcase size={14} /> {job.location_type}
                </span>

                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {job.location || "N/A"}
                </span>

                <span className="flex items-center gap-1">
                  <Wallet size={14} /> {job.salary}
                </span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">
              <button
                onClick={() => openView(job)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Eye size={18} />
              </button>

              <button
                onClick={() => openEdit(job)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={() => remove(job.id)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= VIEW MODAL ================= */}
      {selectedJob && !editMode && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 lg:mt-70 md:mt-100 mt-100">

          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide rounded-2xl bg-background shadow-2xl">

            {/* HEADER */}
            <div className="sticky top-0 bg-background border-b border-border flex justify-between items-center p-4">
              <h2 className="text-xl font-bold">{selectedJob.title}</h2>
              <button onClick={closeModal}>
                <X />
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-6">
              <p className="text-muted whitespace-pre-wrap">
                {selectedJob.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Info icon={<Briefcase size={16} />} label="Job Type" value={selectedJob.location_type} />
                <Info icon={<MapPin size={16} />} label="Location" value={selectedJob.location} />
                <Info icon={<Wallet size={16} />} label="Salary" value={selectedJob.salary} />
                <Info icon={<Calendar size={16} />} label="Deadline" value={selectedJob.deadline} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {selectedJob && editMode && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 lg:mt-70 md:mt-100 mt-100">

          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide rounded-2xl bg-background shadow-2xl p-6 space-y-5">

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Edit Job</h2>
              <button onClick={closeModal}>
                <X />
              </button>
            </div>

            {/* FORM */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <Field label="Job Title">
                <input
                  className="input"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                />
              </Field>

              <Field label="Salary">
                <input
                  className="input"
                  value={editForm.salary}
                  onChange={(e) =>
                    setEditForm({ ...editForm, salary: e.target.value })
                  }
                />
              </Field>

              <Field label="Work Type">
                <select
                  className="input"
                  value={editForm.location_type}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location_type: e.target.value })
                  }
                >
                  <option value="remote">Remote</option>
                  <option value="onsite">Onsite</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </Field>

              <Field label="Location">
                <input
                  className="input"
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
                />
              </Field>

              <Field label="Deadline">
  <input
    type="date"
    className="input"
    value={editForm.deadline}
    onChange={(e) =>
      setEditForm({ ...editForm, deadline: e.target.value })
    }
  />
</Field>
            </div>

            <Field label="Description">
              <textarea
                className="input"
                rows={6}
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
              />
            </Field>

            {/* ACTIONS */}
            <div className="flex gap-3 pt-2">
              <button className="btn-primary flex-1" onClick={saveEdit}>
                Save Changes
              </button>

              <button
                className="flex-1 border border-border rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= UI HELPERS ================= */

const Info = ({ icon, label, value }: any) => (
  <div className="p-4 border border-border rounded-xl flex items-start gap-2">
    <div className="text-primary">{icon}</div>
    <div>
      <p className="font-semibold">{label}</p>
      <p className="text-muted">{value}</p>
    </div>
  </div>
);

const Field = ({ label, children }: any) => (
  <div className="space-y-1">
    <label className="text-sm font-medium">{label}</label>
    {children}
  </div>
);

export default ManageJobs;