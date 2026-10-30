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
  CheckCircle,
  XCircle,
  Clock,
  Video,
  Eye,
  X,
  AlertTriangle,
  Pencil,
} from "lucide-react";

import {
  getCompanyApplications,
  shortlistCandidate,
  rejectCandidate,
  acceptCandidate,
  scheduleInterview,
  updateInterview,
  completeInterview,
} from "../../services/authService";

import { useToast } from "../../components/Toast";
import { getStoredValue } from "../../context/AuthContext";

type ConfirmTone = "primary" | "danger" | "success" | "warning";

interface ConfirmState {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  tone: ConfirmTone;
  onConfirm: () => void | Promise<void>;
}

const CompanyApplicants = () => {
  const toast = useToast();

  const user = JSON.parse(getStoredValue("user") || "{}");

  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Details modal
  const [showDetails, setShowDetails] = useState(false);
  const [detailsApp, setDetailsApp] = useState<any>(null);

  // Interview modal
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [interviewData, setInterviewData] = useState({
    scheduled_at: "",
    meeting_link: "",
  });
  const [editingInterview, setEditingInterview] = useState(false);

  // Confirmation modal
  const [confirm, setConfirm] = useState<ConfirmState>({
    open: false,
    title: "",
    message: "",
    confirmLabel: "Confirm",
    tone: "primary",
    onConfirm: () => {},
  });
  const [confirmLoading, setConfirmLoading] = useState(false);

  const askConfirm = (cfg: Omit<ConfirmState, "open">) =>
    setConfirm({ ...cfg, open: true });

  const closeConfirm = () => {
    if (confirmLoading) return;
    setConfirm((c) => ({ ...c, open: false }));
  };

  const runConfirm = async () => {
    try {
      setConfirmLoading(true);
      await confirm.onConfirm();
    } finally {
      setConfirmLoading(false);
      setConfirm((c) => ({ ...c, open: false }));
    }
  };

  // Load applications
  const loadApplications = async () => {
    try {
      const res = await getCompanyApplications(user.id);
      setApplications(res.data);
    } catch {
      toast.error("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  // ---------- Action implementations ----------
  const doShortlist = async (id: number) => {
    try {
      await shortlistCandidate(id);
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: "shortlisted" } : app
        )
      );
      toast.success("Candidate shortlisted");
    } catch {
      toast.error("Failed to shortlist candidate");
    }
  };

  const doReject = async (id: number) => {
    try {
      await rejectCandidate(id);
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: "rejected" } : app
        )
      );
      toast.success("Candidate rejected");
    } catch {
      toast.error("Failed to reject candidate");
    }
  };

  const doAccept = async (id: number) => {
    try {
      await acceptCandidate(id);
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: "accepted" } : app
        )
      );
      toast.success("Candidate accepted");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to accept candidate");
    }
  };

  const doCompleteInterview = async (interviewId: number, appId: number) => {
    try {
      await completeInterview(interviewId);
      setApplications((prev) =>
        prev.map((app) =>
          app.id === appId
            ? {
                ...app,
                interview: { ...app.interview, status: "completed" },
              }
            : app
        )
      );
      toast.success("Interview completed");
    } catch {
      toast.error("Failed to update interview");
    }
  };

  const doSchedule = async () => {
    try {
      const res = await scheduleInterview({
        application_id: selectedApp.id,
        scheduled_at: interviewData.scheduled_at,
        meeting_link: interviewData.meeting_link,
      });
      setApplications((prev) =>
        prev.map((app) =>
          app.id === selectedApp.id ? { ...app, interview: res.data } : app
        )
      );
      toast.success("Interview scheduled");
      setShowInterviewModal(false);
    } catch {
      toast.error("Failed to schedule interview");
    }
  };

  const doUpdateInterview = async () => {
    if (!selectedApp?.interview) return;
    try {
      const res = await updateInterview(selectedApp.interview.id, interviewData);
      setApplications((prev) =>
        prev.map((app) =>
          app.id === selectedApp.id ? { ...app, interview: res.data } : app
        )
      );
      setDetailsApp((current: any) =>
        current?.id === selectedApp.id ? { ...current, interview: res.data } : current
      );
      toast.success("Interview details updated");
      setShowInterviewModal(false);
      setEditingInterview(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to update interview");
    }
  };

  // ---------- Confirm wrappers ----------
  const handleShortlist = (app: any) =>
    askConfirm({
      title: "Shortlist candidate?",
      message: `Move ${app.first_name} ${app.last_name} to the shortlist for "${app.job_title}"?`,
      confirmLabel: "Shortlist",
      tone: "primary",
      onConfirm: () => doShortlist(app.id),
    });

  const handleReject = (app: any) =>
    askConfirm({
      title: "Reject candidate?",
      message: `Are you sure you want to reject ${app.first_name} ${app.last_name}? This action cannot be undone.`,
      confirmLabel: "Reject",
      tone: "danger",
      onConfirm: () => doReject(app.id),
    });

  const handleAccept = (app: any) =>
    askConfirm({
      title: "Accept candidate?",
      message: `Confirm hiring ${app.first_name} ${app.last_name} for "${app.job_title}"?`,
      confirmLabel: "Accept",
      tone: "success",
      onConfirm: () => doAccept(app.id),
    });

  const handleCompleteInterview = (app: any) =>
    askConfirm({
      title: "Mark interview as completed?",
      message: `Confirm that the interview with ${app.first_name} ${app.last_name} has been completed.`,
      confirmLabel: "Mark Completed",
      tone: "warning",
      onConfirm: () => doCompleteInterview(app.interview.id, app.id),
    });

  const handleSchedule = () => {
    if (!interviewData.scheduled_at || !interviewData.meeting_link) {
      toast.error("Please fill all interview fields");
      return;
    }
    askConfirm({
      title: "Schedule interview?",
      message: `Schedule an interview with ${selectedApp.first_name} ${
        selectedApp.last_name
      } on ${new Date(interviewData.scheduled_at).toLocaleString()}?`,
      confirmLabel: "Schedule",
      tone: "primary",
      onConfirm: doSchedule,
    });
  };

  // Open interview modal
  const openInterviewModal = (app: any) => {
    setSelectedApp(app);
    setEditingInterview(false);
    setInterviewData({ scheduled_at: "", meeting_link: "" });
    setShowInterviewModal(true);
  };

  const openEditInterview = (app: any) => {
    const date = app.interview?.scheduled_at
      ? new Date(app.interview.scheduled_at)
      : null;
    const localDate = date
      ? new Date(date.getTime() - date.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16)
      : "";
    setSelectedApp(app);
    setEditingInterview(true);
    setInterviewData({
      scheduled_at: localDate,
      meeting_link: app.interview?.meeting_link || "",
    });
    setShowInterviewModal(true);
  };

  // Open details
  const openDetails = (app: any) => {
    setDetailsApp(app);
    setShowDetails(true);
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatDateTime = (date: string) => new Date(date).toLocaleString();

  // Status badge styles
  const statusStyles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    shortlisted: "bg-blue-100 text-blue-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  // Confirm button tone classes
  const toneClasses: Record<ConfirmTone, string> = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    warning: "bg-amber-600 hover:bg-amber-700 text-white",
  };

  const toneIconBg: Record<ConfirmTone, string> = {
    primary: "bg-indigo-100 text-indigo-600",
    danger: "bg-red-100 text-red-600",
    success: "bg-green-100 text-green-600",
    warning: "bg-amber-100 text-amber-600",
  };

  return (
    <div className="space-y-6 fade-up px-3 sm:px-4 md:px-6 py-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Applicants</h1>
        <p className="text-muted text-sm sm:text-base">
          Candidates who applied for your jobs
        </p>
      </div>

      {loading ? (
        <div className="card p-8 text-center">Loading applicants...</div>
      ) : applications.length === 0 ? (
        <div className="card p-8 text-center">
          No applications received yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {applications.map((app) => {
            const status = app.status || "pending";
            return (
              <div
                key={app.id}
                className="card p-4 sm:p-6 space-y-4 flex flex-col"
              >
                {/* Header row */}
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <div className="min-w-0 flex items-center gap-3">
                    <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 grid place-items-center">
                      <User size={20} />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-base sm:text-lg font-bold truncate">
                        {app.first_name} {app.last_name}
                      </h2>
                      <p className="text-xs sm:text-sm text-muted truncate">
                        {app.job_title}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full capitalize ${
                      statusStyles[status] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {status}
                  </span>
                </div>

                {/* Quick contact */}
                <div className="space-y-1.5 text-sm text-muted">
                  <p className="flex items-center gap-2 min-w-0">
                    <Mail size={14} className="shrink-0" />
                    <span className="truncate">{app.email}</span>
                  </p>
                  <p className="flex items-center gap-2 min-w-0">
                    <Phone size={14} className="shrink-0" />
                    <span className="truncate">{app.contact_number}</span>
                  </p>
                  <p className="flex items-center gap-2 min-w-0">
                    <MapPin size={14} className="shrink-0" />
                    <span className="truncate">{app.address}</span>
                  </p>
                </div>

                {/* Quick job tags */}
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="flex items-center gap-1 bg-muted/30 px-2 py-2 rounded capitalize">
                    <Briefcase size={12} />
                    {app.location_type}
                  </span>
                  <span className="flex items-center gap-1 bg-muted/30 px-2 py-1 rounded">
                    <Wallet size={12} />
                    Expected Salary: {app.expected_salary || "Negotiable"}
                  </span>
                  <span className="flex items-center gap-1 bg-muted/30 px-2 py-1 rounded">
                    <CalendarDays size={12} />
                    Deadline: {formatDate(app.deadline)}
                  </span>
                </div>

                {/* Interview status */}
                {app.interview && (
                  <div className="border border-gray-400 rounded-lg p-3 text-md bg-blue-50/40">
                    <div className="flex items-center gap-2 font-semibold mb-1">
                      <Video size={20} />
                      Interview ({app.interview.status})
                    </div>
                    <p className="text-muted text-sm">
                      <Clock size={12} className="inline mr-1" />
                      {formatDateTime(app.interview.scheduled_at)}
                    </p>
                    {app.interview.meeting_link && (
                      <a
                        href={app.interview.meeting_link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary text-sm text-decoration-none break-all"
                      >
                        {app.interview.meeting_link}
                      </a>
                    )}
                    {app.interview.status === "scheduled" && (
                      <button
                        onClick={() => openEditInterview(app)}
                        className="mt-2 ml-5 inline-flex items-center gap-1 rounded-lg border border-primary px-3 py-1.5 text-xs text-primary hover:bg-primary/10 cursor-pointer"
                      >
                        <Pencil size={13} /> Edit interview
                      </button>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="mt-auto flex flex-wrap gap-2">
                  <button
                    onClick={() => openDetails(app)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 text-xs sm:text-sm px-3 py-2 rounded-md border border-gray-400 hover:bg-muted/40"
                  >
                    <Eye size={14} /> View Details
                  </button>

                  {status === "pending" && (
                    <>
                      <button
                        onClick={() => handleShortlist(app)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 text-xs sm:text-sm px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                      >
                        <CheckCircle size={14} /> Shortlist
                      </button>
                      <button
                        onClick={() => handleReject(app)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 text-xs sm:text-sm px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                      >
                        <XCircle size={14} /> Reject
                      </button>
                    </>
                  )}

                  {status === "shortlisted" && !app.interview && (
                    <button
                      onClick={() => openInterviewModal(app)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 text-xs sm:text-sm px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      <Video size={14} /> Schedule Interview
                    </button>
                  )}

                  {app.interview?.status === "scheduled" && (
                    <button
                      onClick={() => handleCompleteInterview(app)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 text-xs sm:text-sm px-3 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700"
                    >
                      <Clock size={14} /> Mark Completed
                    </button>
                  )}

                  {app.interview?.status === "completed" &&
                    status !== "accepted" &&
                    status !== "rejected" && (
                      <button
                        onClick={() => handleAccept(app)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 text-xs sm:text-sm px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                      >
                        <CheckCircle size={14} /> Accept
                      </button>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------- Details Modal ---------- */}
      {showDetails && detailsApp && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center justify-between lg:mt-20 md:mt-20 mt-0 scrollbar-hide">
              <h2 className="text-lg font-bold flex items-center gap-2 min-w-0">
                <User size={18} className="shrink-0" />
                <span className="truncate">
                  {detailsApp.first_name} {detailsApp.last_name}
                </span>
              </h2>
              <button
                onClick={() => setShowDetails(false)}
                className="p-1 rounded hover:bg-muted/50 shrink-0 cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              <section>
                <h3 className="font-semibold mb-2">Contact</h3>
                <div className="space-y-2 text-sm text-muted">
                  <p className="flex items-center gap-2 break-all">
                    <Mail size={14} className="shrink-0" />
                    {detailsApp.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={14} className="shrink-0" />
                    {detailsApp.contact_number}
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin size={14} className="shrink-0 mt-0.5" />
                    {detailsApp.address}
                  </p>
                </div>
              </section>

              <section className="border-t border-border pt-4">
                <h3 className="font-semibold mb-2">Candidate Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <p className="flex items-center gap-2">
                    <GraduationCap size={14} />{" "}
                    <span className="font-medium">Degree:</span>{" "}
                    {detailsApp.degree}
                  </p>
                  <p className="flex items-center gap-2">
                    <Briefcase size={14} />{" "}
                    <span className="font-medium">Experience:</span>{" "}
                    {detailsApp.experience} years
                  </p>
                  <p className="flex items-center gap-2">
                    <Wallet size={14} />{" "}
                    <span className="font-medium">Expected Salary:</span>{" "}
                    {detailsApp.expected_salary}
                  </p>
                  <p className="flex items-start gap-2 sm:col-span-2">
                    <FileText size={14} className="shrink-0 mt-0.5" />
                    <span>
                      <span className="font-medium">Skills:</span>{" "}
                      {detailsApp.skills}
                    </span>
                  </p>
                </div>

                {detailsApp.cover_letter && (
                  <div className="mt-4">
                    <p className="font-semibold mb-1">Cover Letter</p>
                    <p className="text-muted text-sm whitespace-pre-wrap">
                      {detailsApp.cover_letter}
                    </p>
                  </div>
                )}
              </section>

              <section className="border-t border-border pt-4">
                <h3 className="font-semibold mb-2">Applied Job</h3>
                <p className="font-semibold">{detailsApp.job_title}</p>
                <div className="flex flex-col gap-3 mt-2 text-xs sm:text-sm text-muted">
                  <span className="flex items-center gap-1 capitalize">
                    <Briefcase size={14} /> {detailsApp.location_type}
                  </span>
                  <span className="flex items-center gap-1">
                    <Wallet size={14} />{" "}
                    <span className="font-medium">Salary:</span>{" "}
                    {detailsApp.salary || "Negotiable"}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays size={14} />{" "}
                    <span className="font-medium">Deadline:</span>{" "}
                    {formatDate(detailsApp.deadline)}
                  </span>
                </div>
              </section>

              {detailsApp.resume_url && (
                <section className="border-t border-border pt-4">
                  <h3 className="font-semibold mb-2">Resume</h3>
                  <iframe
                    src={`${detailsApp.resume_url}#toolbar=0`}
                    className="w-full h-[60vh] sm:h-[500px] border rounded-xl"
                  />
                  <a
                    href={detailsApp.resume_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 text-sm text-primary underline"
                  >
                    Open resume in new tab
                  </a>
                </section>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------- Schedule Interview Modal ---------- */}
      {showInterviewModal && selectedApp && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setShowInterviewModal(false)}
        >
          <div
            className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Video size={18} /> {editingInterview ? "Edit Interview" : "Schedule Interview"}
              </h2>
              <button
                onClick={() => setShowInterviewModal(false)}
                className="p-1 rounded hover:bg-muted/50"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <p className="text-sm text-muted">
                For{" "}
                <span className="font-semibold text-foreground">
                  {selectedApp.first_name} {selectedApp.last_name}
                </span>
              </p>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={interviewData.scheduled_at}
                  onChange={(e) =>
                    setInterviewData((p) => ({
                      ...p,
                      scheduled_at: e.target.value,
                    }))
                  }
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Meeting Link
                </label>
                <input
                  type="url"
                  placeholder="https://meet.google.com/..."
                  value={interviewData.meeting_link}
                  onChange={(e) =>
                    setInterviewData((p) => ({
                      ...p,
                      meeting_link: e.target.value,
                    }))
                  }
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowInterviewModal(false)}
                  className="px-4 py-2 rounded-md border text-sm hover:bg-muted/40"
                >
                  Cancel
                </button>
                <button
                  onClick={editingInterview ? () => {
                    if (!interviewData.scheduled_at || !interviewData.meeting_link) {
                      toast.error("Please fill all interview fields");
                      return;
                    }
                    askConfirm({
                      title: "Update interview?",
                      message: `Update the interview with ${selectedApp.first_name} ${selectedApp.last_name}?`,
                      confirmLabel: "Update",
                      tone: "primary",
                      onConfirm: doUpdateInterview,
                    });
                  } : handleSchedule}
                  className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
                >
                  {editingInterview ? "Save changes" : "Schedule"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Confirmation Modal ---------- */}
      {confirm.open && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={closeConfirm}
        >
          <div
            className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div
                  className={`shrink-0 w-10 h-10 rounded-full grid place-items-center ${
                    toneIconBg[confirm.tone]
                  }`}
                >
                  <AlertTriangle size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-bold">
                    {confirm.title}
                  </h3>
                  <p className="text-sm text-muted mt-1">{confirm.message}</p>
                </div>
                <button
                  onClick={closeConfirm}
                  disabled={confirmLoading}
                  className="p-1 rounded hover:bg-muted/50 shrink-0 disabled:opacity-50"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-6">
                <button
                  onClick={closeConfirm}
                  disabled={confirmLoading}
                  className="px-4 py-2 rounded-md border text-sm hover:bg-muted/40 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={runConfirm}
                  disabled={confirmLoading}
                  className={`px-4 py-2 rounded-md text-sm font-medium disabled:opacity-60 ${
                    toneClasses[confirm.tone]
                  }`}
                >
                  {confirmLoading ? "Please wait..." : confirm.confirmLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyApplicants;
