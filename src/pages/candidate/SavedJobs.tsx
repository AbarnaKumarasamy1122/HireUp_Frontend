import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
    MapPin, Briefcase, Wallet, CalendarDays, Search,
    Building2, Bookmark, CheckCircle, AlertTriangle, X,
} from "lucide-react";
import {
    getSavedJobs, applyJob, removeSavedJob,
    getCandidateProfile, getAppliedJobIds,
} from "../../services/authService";
import { useToast } from "../../components/Toast";

const SavedJobs = () => {
    const toast = useToast();

    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [deleteConfirmJob, setDeleteConfirmJob] = useState<any>(null);

    const [formData, setFormData] = useState({
        cover_letter: "", experience: "", degree: "",
        expected_salary: "", contact_number: "", address: "", skills: "",
    });

    useEffect(() => {
        const open = showModal || !!deleteConfirmJob;
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, [showModal, deleteConfirmJob]);

    const loadJobs = async () => {
        try {
            setLoading(true);
            const [savedRes, appliedRes] = await Promise.all([
                getSavedJobs(), getAppliedJobIds(),
            ]);
            const normalized = (savedRes.data || []).map((item: any) => ({
                id: item.job_id,
                title: item.title,
                description: item.description,
                company_name: item.company_name,
                location: item.location,
                location_type: item.location_type,
                salary: item.salary,
                deadline: item.deadline,
            }));
            setJobs(normalized);
            setAppliedJobs(appliedRes.data || []);
        } catch (err) {
            console.log(err);
            toast.error("Failed to load saved jobs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadJobs(); }, []);

    const filteredJobs = useMemo(() => {
        const keyword = search.toLowerCase();
        return jobs.filter((job) =>
            job.title?.toLowerCase().includes(keyword) ||
            job.company_name?.toLowerCase().includes(keyword) ||
            job.location?.toLowerCase().includes(keyword) ||
            job.description?.toLowerCase().includes(keyword)
        );
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
            const user = JSON.parse(sessionStorage.getItem("user") || "{}");
            const profile = await getCandidateProfile(user.id);
            if (!profile.data.resume_url) {
                toast.error("Please upload your resume first");
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
        } catch (err: any) {
            toast.error(err?.response?.data?.error || "Failed to apply");
        }
    };

    const openDeleteConfirm = (job: any) => setDeleteConfirmJob(job);
    const closeDeleteConfirm = () => setDeleteConfirmJob(null);

    const confirmRemoveJob = async () => {
        if (!deleteConfirmJob) return;
        try {
            await removeSavedJob(deleteConfirmJob.id);
            setJobs((prev) => prev.filter((job) => job.id !== deleteConfirmJob.id));
            toast.success("Removed from saved jobs");
            setDeleteConfirmJob(null);
        } catch (err) {
            console.log(err);
            toast.error("Failed to remove job");
        }
    };

    const formatDate = (date?: string) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric",
        });
    };

    const applyModal = showModal && typeof document !== "undefined"
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

                    <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide overscroll-contain px-5 py-4 space-y-4">
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

    const deleteModal = deleteConfirmJob && typeof document !== "undefined"
        ? createPortal(
            <div
                className="fixed inset-0 z-[99999] bg-black/60 flex items-center justify-center p-3"
                onClick={closeDeleteConfirm}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-md bg-background rounded-2xl p-6 text-center space-y-5"
                >
                    <AlertTriangle className="mx-auto text-red-600" />
                    <h2 className="font-bold">Remove Saved Job</h2>
                    <p className="text-muted">
                        Are you sure you want to remove{" "}
                        <span className="font-semibold">{deleteConfirmJob.title}</span> from your saved jobs?
                    </p>
                    <button className="w-full bg-red-600 text-white py-2 rounded-lg cursor-pointer" onClick={confirmRemoveJob}>
                        Remove
                    </button>
                    <button className="w-full border border-gray-400 py-2 rounded-lg cursor-pointer" onClick={closeDeleteConfirm}>
                        Cancel
                    </button>
                </div>
            </div>,
            document.body
        )
        : null;

    return (
        <div className="space-y-6 fade-up">
            <div>
                <h1 className="text-3xl font-bold">Saved Jobs</h1>
                <p className="text-muted">Jobs you saved for later</p>
            </div>

            <div className="card p-4">
                <div className="flex items-center gap-3">
                    <Search size={20} className="text-primary" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search saved jobs..."
                        className="w-full bg-transparent outline-none"
                    />
                </div>
            </div>

            {loading ? (
                <div className="card p-10 text-center">Loading saved jobs...</div>
            ) : filteredJobs.length === 0 ? (
                <div className="card p-10 text-center">No saved jobs found</div>
            ) : (
                <div className="grid gap-5">
                    {filteredJobs.map((job) => {
                        const isApplied = appliedJobs.includes(job.id);
                        return (
                            <div key={job.id} className="card p-6 hover:shadow-lg transition">
                                <div className="flex flex-col lg:flex-row justify-between gap-6">
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-xl font-bold">{job.title}</h2>
                                        <div className="flex items-center gap-2 text-primary mt-2">
                                            <Building2 size={18} />
                                            {job.company_name || "Company"}
                                        </div>
                                        <p className="mt-4 text-muted line-clamp-3">
                                            {job.description || "No description available"}
                                        </p>
                                        <div className="flex flex-wrap gap-5 mt-5 text-sm text-muted">
                                            <div className="flex items-center gap-2"><MapPin size={16} />{job.location || "Remote"}</div>
                                            <div className="flex items-center gap-2 capitalize"><Briefcase size={16} />{job.location_type}</div>
                                            <div className="flex items-center gap-2"><Wallet size={16} />{job.salary || "Negotiable"}</div>
                                            <div className="flex items-center gap-2"><CalendarDays size={16} />{formatDate(job.deadline)}</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center gap-3 lg:w-52">
                                        <button
                                            disabled={isApplied}
                                            onClick={() => openApplyModal(job)}
                                            className={`py-3 rounded-xl font-medium transition cursor-pointer ${isApplied ? "bg-green-100 text-green-700 cursor-not-allowed" : "btn-primary"
                                                }`}
                                        >
                                            {isApplied ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <CheckCircle size={18} />Applied
                                                </span>
                                            ) : "Apply Now"}
                                        </button>

                                        <button
                                            onClick={() => openDeleteConfirm(job)}
                                            className="py-2 rounded-xl border hover:bg-red-50 text-red-600"
                                        >
                                            <span className="flex items-center justify-center cursor-pointer gap-2">
                                                <Bookmark size={18} />Remove
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {applyModal}
            {deleteModal}
        </div>
    );
};

export default SavedJobs;
