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
  AlertTriangle,
} from "lucide-react";

import { useToast } from "../../components/Toast";

const emptyJob = {
  title: "",
  description: "",
  salary: "",
  location: "",
  location_type: "",
  deadline: "",
};

const ManageJobs = () => {
  const toast = useToast();
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<any>(emptyJob);

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteConfirmJob, setDeleteConfirmJob] = useState<any>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getCompanyJobs(user.id);
      setJobs(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const anyModalOpen = selectedJob || deleteConfirmJob;
    document.body.style.overflow = anyModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedJob, deleteConfirmJob]);

  const closeModal = () => {
    setSelectedJob(null);
    setEditMode(false);
    setEditForm(emptyJob);
  };

  const openDeleteConfirm = (job: any) => setDeleteConfirmJob(job);
  const closeDeleteConfirm = () => setDeleteConfirmJob(null);

  const confirmDelete = async () => {
    if (!deleteConfirmJob) return;
    setActionLoading(true);

    try {
      await deleteJob(deleteConfirmJob.id);
      toast.success("Job deleted successfully");
      closeDeleteConfirm();
      load();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to delete job");
    } finally {
      setActionLoading(false);
    }
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
    setActionLoading(true);
    try {
      await updateJob(selectedJob.id, editForm);
      toast.success("Job updated successfully");
      closeModal();
      load();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Update failed");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="fade-up space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Manage Jobs</h1>
        <p className="text-muted text-sm sm:text-base">
          View, edit, and manage your postings
        </p>
      </div>

      {loading && <p className="text-muted">Loading jobs...</p>}

      {!loading && jobs.length === 0 && (
        <p className="text-muted">No jobs found.</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="card p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
          >
            <div className="space-y-2 flex-1 min-w-0">
              <h2 className="text-lg font-bold break-words">{job.title}</h2>
              <p className="text-muted text-sm line-clamp-2 break-words">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-3 text-sm text-muted">
                <span className="flex items-center gap-1">
                  <Briefcase size={14} />
                  {job.location_type}
                </span>

                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {job.location || "N/A"}
                </span>

                <span className="flex items-center gap-1">
                  <Wallet size={14} />
                  {job.salary}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap lg:flex-col gap-2 lg:items-end">
              <button onClick={() => openView(job)}>
                <Eye size={18} />
              </button>
              <button onClick={() => openEdit(job)}>
                <Pencil size={18} />
              </button>
              <button onClick={() => openDeleteConfirm(job)}>
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= VIEW MODAL ================= */}
      {selectedJob && !editMode && (
        <div className="fixed inset-0 z-[99999] bg-black/60 flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-4xl bg-background rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b flex justify-between p-4">
              <h2 className="font-bold">{selectedJob.title}</h2>
              <button onClick={closeModal}>
                <X />
              </button>
            </div>

            <div className="p-4 space-y-6">
              <p className="text-muted whitespace-pre-wrap break-words">
                {selectedJob.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Info icon={ <Briefcase size={16} />} label="Job Type" value={selectedJob.location_type} />
                <Info icon={ <MapPin size={16} />} label="Location" value={selectedJob.location} />
                <Info icon={<Wallet size={16} />} label="Salary" value={selectedJob.salary} />
                <Info icon={<Calendar size={16} />} label="Deadline" value={selectedJob.deadline} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL (FIXED MOBILE) ================= */}
      {selectedJob && editMode && (
        <div className="fixed inset-0 z-[99999] bg-black/60 flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-background rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 space-y-5 pb-10">
            
            <div className="flex justify-between items-center">
              <h2 className="font-bold">Edit Job</h2>
              <button onClick={closeModal}>
                <X />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Job Title">
                <input className="input w-full" value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}/>
              </Field>

              <Field label="Salary">
                <input className="input w-full" value={editForm.salary}
                  onChange={(e) => setEditForm({ ...editForm, salary: e.target.value })}/>
              </Field>

              <Field label="Work Type">
                <select className="input w-full" value={editForm.location_type}
                  onChange={(e) => setEditForm({ ...editForm, location_type: e.target.value })}>
                  <option value="remote">Remote</option>
                  <option value="onsite">Onsite</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </Field>

              <Field label="Location">
                <input className="input w-full" value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}/>
              </Field>

              <Field label="Deadline">
                <input type="date" className="input w-full" value={editForm.deadline}
                  onChange={(e) => setEditForm({ ...editForm, deadline: e.target.value })}/>
              </Field>
            </div>

            <Field label="Description">
              <textarea className="input w-full" rows={5}
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}/>
            </Field>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button className="btn-primary w-full" onClick={saveEdit}>
                Save Changes
              </button>
              <button className="w-full border rounded-lg py-2" onClick={closeModal}>
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {deleteConfirmJob && (
        <div className="fixed inset-0 z-[99999] bg-black/60 flex items-center justify-center p-3">
          <div className="w-full max-w-md bg-background rounded-2xl p-6 text-center space-y-5">
            <AlertTriangle className="mx-auto text-red-600" />
            <h2 className="font-bold">Delete Job</h2>

            <p className="text-muted">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deleteConfirmJob.title}</span>?
            </p>

            <button className="w-full bg-red-600 text-white py-2 rounded-lg"
              onClick={confirmDelete}>
              Delete
            </button>

            <button className="w-full border py-2 rounded-lg"
              onClick={closeDeleteConfirm}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* helpers */
const Info = ({ icon, label, value }: any) => (
  <div className="p-4 border rounded-xl flex gap-3">
    {icon}
    <div>
      <p className="font-semibold">{label}</p>
      <p className="text-muted">{value || "N/A"}</p>
    </div>
  </div>
);

const Field = ({ label, children }: any) => (
  <div className="space-y-1 w-full">
    <label className="text-sm font-medium">{label}</label>
    {children}
  </div>
);

export default ManageJobs;