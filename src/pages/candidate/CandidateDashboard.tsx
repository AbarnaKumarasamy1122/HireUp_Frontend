import { useEffect, useMemo, useState } from "react";
import { Award, Bell, BriefcaseBusiness, CalendarDays, CheckCircle2, Clock3, XCircle } from "lucide-react";
import { getMyApplications, getMyInterviews, getMyNotifications } from "../../services/authService";

type Application = { id: number; status: string; created_at: string };
type Interview = { id: number; status: string; scheduled_at: string; job_title: string };
type CandidateNotification = { id: number; title: string; message: string; created_at: string };

const CandidateDashboard = () => {
  const [apps, setApps] = useState<Application[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [notifications, setNotifications] = useState<CandidateNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMyApplications(), getMyInterviews(), getMyNotifications()])
      .then(([applications, interviewData, notificationData]) => {
        setApps(applications.data || []);
        setInterviews(interviewData.data || []);
        setNotifications(notificationData.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const statusCounts = useMemo(() => apps.reduce<Record<string, number>>((result, app) => {
    result[app.status] = (result[app.status] || 0) + 1;
    return result;
  }, {}), [apps]);
  const maxStatus = Math.max(...Object.values(statusCounts), 1);
  const stats = [
    { label: "Applications", value: apps.length, icon: <BriefcaseBusiness size={21} />, color: "bg-blue-50 text-blue-600" },
    { label: "Interviews", value: interviews.length, icon: <CalendarDays size={21} />, color: "bg-violet-50 text-violet-600" },
    { label: "Notifications", value: notifications.length, icon: <Bell size={21} />, color: "bg-amber-50 text-amber-600" },
  ];

  if (loading) return <div className="card p-10 text-center text-muted">Loading your dashboard...</div>;

  return (
    <div className="space-y-6 fade-up">
      <div>
        <h1 className="text-3xl font-bold">Candidate Dashboard</h1>
        <p className="mt-1 text-muted">Track your job search progress in one place.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => <div key={stat.label} className="card flex items-center justify-between p-5"><div><p className="text-sm text-muted">{stat.label}</p><p className="mt-2 text-3xl font-bold">{stat.value}</p></div><div className={`rounded-xl p-3 ${stat.color}`}>{stat.icon}</div></div>)}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <div className="mb-6 flex items-center justify-between"><div><h2 className="text-xl font-semibold">Application progress</h2><p className="text-sm text-muted">Your applications by status</p></div><Award className="text-primary" /></div>
          <div className="space-y-4">
            {["pending", "shortlisted", "accepted", "rejected"].map((status) => {
              const count = statusCounts[status] || 0;
              return <div key={status}><div className="mb-1 flex justify-between text-sm"><span className="capitalize">{status}</span><span className="font-semibold">{count}</span></div><div className="h-2 rounded-full bg-slate-100 dark:bg-slate-200"><div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${(count / maxStatus) * 100}%` }} /></div></div>;
            })}
          </div>
        </div>
        <div className="card p-6">
          <div className="mb-5 flex items-center justify-between"><div><h2 className="text-xl font-semibold">Upcoming interviews</h2><p className="text-sm text-muted">Your scheduled conversations</p></div><Clock3 className="text-primary" /></div>
          {interviews.length === 0 ? <p className="py-8 text-center text-muted">No interviews scheduled yet.</p> : <div className="space-y-3">{interviews.slice(0, 4).map((interview) => <div key={interview.id} className="rounded-xl border border-border p-3"><div className="flex items-center justify-between gap-3"><p className="font-medium">{interview.job_title}</p><span className="rounded-full bg-blue-50 px-2 py-1 text-xs capitalize text-blue-700">{interview.status}</span></div><p className="mt-1 text-sm text-muted">{new Date(interview.scheduled_at).toLocaleString()}</p></div>)}</div>}
        </div>
      </div>
      <div className="card p-6">
        <div className="mb-4 flex items-center justify-between"><div><h2 className="text-xl font-semibold">Important updates</h2><p className="text-sm text-muted">Interview and application notifications</p></div><Bell className="text-primary" /></div>
        {notifications.length === 0 ? <p className="py-5 text-center text-muted">No important updates yet.</p> : <div className="space-y-3">{notifications.slice(0, 5).map((notification) => <div key={notification.id} className="rounded-xl border border-border p-3"><p className="font-medium">{notification.title}</p><p className="text-sm text-muted">{notification.message}</p><p className="mt-1 text-xs text-muted">{new Date(notification.created_at).toLocaleString()}</p></div>)}</div>}
      </div>
      <div className="card p-6">
        <h2 className="mb-4 text-xl font-semibold">Search summary</h2>
        <div className="grid gap-4 sm:grid-cols-3"><div className="flex items-center gap-3"><CheckCircle2 className="text-green-600" /><span><b>{statusCounts.accepted || 0}</b> accepted</span></div><div className="flex items-center gap-3"><Clock3 className="text-amber-600" /><span><b>{statusCounts.pending || 0}</b> pending</span></div><div className="flex items-center gap-3"><XCircle className="text-red-600" /><span><b>{statusCounts.rejected || 0}</b> declined</span></div></div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
