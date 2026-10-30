import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  MapPin, Briefcase, Wallet, CalendarDays, Search,
  Building2, Bookmark, CheckCircle, X, Clock3
} from "lucide-react";
import {
  getAllJobs, applyJob, saveJob,
  getAppliedJobIds, getSavedJobIds, getCandidateProfile,
} from "../../services/authService";
import { useToast } from "../../components/Toast";
import { getStoredValue } from "../../context/AuthContext";

const BrowseJobs = () => {
  const toast = useToast();

  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const [formData, setFormData] = useState({
    cover_letter: "", experience: "", degree: "",
    expected_salary: "", contact_number: "", address: "", skills: "",
  });

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!showModal) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [showModal]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [jobsRes, appliedRes, savedRes] = await Promise.all([
        getAllJobs(), getAppliedJobIds(), getSavedJobIds(),
      ]);
      setJobs(jobsRes.data || []);
      setAppliedJobs(appliedRes.data || []);
      setSavedJobs(savedRes.data || []);
    } catch {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const getPostedTime = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();

    const diffMs = now.getTime() - created.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 30) return `${diffDays} days ago`;

    const months = Math.floor(diffDays / 30);
    if (months < 12) return `${months} months ago`;

    const years = Math.floor(months / 12);
    return `${years} years ago`;
  };
  
  const filteredJobs = useMemo(() => {
    const keyword = search.toLowerCase();
    return jobs.filter((job) => {
      const deadline = new Date(job.deadline);
      if (deadline < new Date()) return false;
      return (
        job.title?.toLowerCase().includes(keyword) ||
        job.company_name?.toLowerCase().includes(keyword) ||
        job.location?.toLowerCase().includes(keyword)
      );
    });
  }, [jobs, search]);

  const openApplyModal = (job: any) => {
    setSelectedJob(job);
    setFormData({
      cover_letter: "", experience: "", degree: "",
      expected_salary: "", contact_number: "", address: "", skills: "",
    });
    setShowModal(true);
  };

  const handleSubmitApplication = async () => {
    try {
      const user = JSON.parse(getStoredValue("user") || "{}");
      const profile = await getCandidateProfile(user.id);
      if (!profile.data.resume_url) {
        toast.error("Please upload your resume before applying.");
        return;
      }
      await applyJob({
        job_id: selectedJob.id,
        resume_url: profile.data.resume_url,
        ...formData,
      });
      setAppliedJobs((prev) => [...prev, selectedJob.id]);
      toast.success("Application submitted successfully");
      setShowModal(false);
    } catch {
      toast.error("Failed to submit application");
    }
  };

  const handleSave = async (jobId: number) => {
    try {
      await saveJob(jobId);
      toast.success("Job saved successfully");
      const res = await getSavedJobIds();
      setSavedJobs(res.data || []);
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to save job");
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    });

  // Modal rendered via portal so an ancestor `transform` (fade-up)
  // can't trap `position: fixed` inside the scrolled page.
  const modal = showModal && typeof document !== "undefined"
    ? createPortal(
        <div
          className="fixed inset-0 z-[99999] bg-black/60 flex items-end sm:items-center justify-center sm:p-4"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              w-full bg-background shadow-2xl flex flex-col overflow-hidden
              h-[100dvh] sm:h-auto sm:max-h-[90vh]
              sm:max-w-2xl sm:rounded-2xl
            "
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-background shrink-0">
              <h2 className="text-lg font-bold truncate pr-2">
                Apply for {selectedJob?.title}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-border transition shrink-0 cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain scrollbar-hide px-5 py-4 space-y-4">
              <textarea rows={4} placeholder="Cover Letter"
                value={formData.cover_letter}
                onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                className="input w-full text-base" />
              <input placeholder="Years of Experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="input w-full text-base" />
              <input placeholder="Highest Degree"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="input w-full text-base" />
              <input placeholder="Expected Salary"
                value={formData.expected_salary}
                onChange={(e) => setFormData({ ...formData, expected_salary: e.target.value })}
                className="input w-full text-base" />
              <input placeholder="Contact Number"
                value={formData.contact_number}
                onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                className="input w-full text-base" />
              <textarea rows={3} placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="input w-full text-base" />
              <textarea rows={3} placeholder="Skills"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="input w-full text-base" />
            </div>

            <div
              className="border-t border-border p-4 flex flex-col-reverse sm:flex-row gap-3 bg-background shrink-0"
              style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
            >
              <button onClick={() => setShowModal(false)}
                className="w-full border border-gray-400 rounded-lg py-2.5 hover:bg-border/30 transition cursor-pointer">
                Cancel
              </button>
              <button onClick={handleSubmitApplication}
                className="btn-primary w-full py-2.5 cursor-pointer">
                Submit Application
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <div className="space-y-6 fade-up">
      <div>
        <h1 className="text-3xl font-bold">Browse Jobs</h1>
        <p className="text-muted">Explore and apply for jobs</p>
      </div>

      <div className="card p-4">
        <div className="flex items-center gap-3">
          <Search size={20} className="text-primary" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs..."
            className="w-full bg-transparent outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="card p-10 text-center">Loading jobs...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="card p-10 text-center">No jobs found</div>
      ) : (
        <div className="grid gap-5">
          {filteredJobs.map((job) => {
            const isApplied = appliedJobs.includes(job.id);
            const isSaved = savedJobs.includes(job.id);
            return (
              <div key={job.id} className="card p-6 hover:shadow-lg transition">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold">{job.title}</h2>
                    <div className="flex items-center gap-2 text-primary mt-2">
                      <Building2 size={18} />
                      {job.company_name}
                    </div>
                    <p className="mt-4 text-muted line-clamp-3">{job.description}</p>
                    <div className="flex flex-wrap gap-5 mt-5 text-sm text-muted">
                      <div className="flex items-center gap-2"><MapPin size={16} />{job.location || "Remote"}</div>
                      <div className="flex items-center gap-2"><Briefcase size={16} />{job.location_type}</div>
                      <div className="flex items-center gap-2"><Wallet size={16} />{job.salary || "Negotiable"}</div>
                      <div className="flex items-center gap-2"><CalendarDays size={16} />{formatDate(job.deadline)}</div>
                      <div className="flex items-center gap-2"><Clock3 size={16} />Posted {getPostedTime(job.created_at)}</div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-3 lg:w-52">
                    <button
                      disabled={isApplied}
                      onClick={() => openApplyModal(job)}
                      className={`py-3 rounded-xl font-medium cursor-pointer transition ${
                        isApplied ? "bg-green-100 text-green-700 cursor-not-allowed" : "btn-primary"
                      }`}
                    >
                      {isApplied ? (
                        <span className="flex items-center justify-center gap-2">
                          <CheckCircle size={18} />Applied
                        </span>
                      ) : "Apply Now"}
                    </button>

                    <button
                      disabled={isSaved}
                      onClick={() => handleSave(job.id)}
                      className={`py-2 rounded-xl border border-primary transition cursor-pointer ${
                        isSaved
                          ? "bg-blue-50 text-blue-600 border-blue-200 cursor-not-allowed"
                          : "hover:bg-slate-100 dark:hover:bg-slate-200"
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Bookmark size={18} className="text-primary" />
                        {isSaved ? "Saved" : "Save Job"}
                      </span>
                    </button>
                  </div>
                </div>
                </div>
            );
          })}
        </div>
      )}

      {modal}
    </div>
  );
};

export default BrowseJobs;
