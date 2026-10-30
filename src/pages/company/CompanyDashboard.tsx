import { useEffect, useMemo, useState } from "react";
import { Activity, Bell, BriefcaseBusiness, CheckCircle2, Clock3, Users } from "lucide-react";
import { getCompanyAnalytics, getCompanyProfile, getMyNotifications } from "../../services/authService";
import { useToast } from "../../components/Toast";

type AnalyticsData = { jobs: number; applications: number; pending: number };
type Company = { company_name?: string; first_name?: string };
type CompanyNotification = { id: number; title: string; message: string; created_at: string };

const CompanyDashboard = () => {
  const toast = useToast();
  const [stats, setStats] = useState<AnalyticsData>({ jobs: 0, applications: 0, pending: 0 });
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<CompanyNotification[]>([]);
  const id = Number(location.pathname.split("/")[2]);

  useEffect(() => {
    if (!id) return;
    Promise.all([getCompanyAnalytics(id), getCompanyProfile(id), getMyNotifications()])
      .then(([analytics, profile, notificationData]) => {
        setStats(analytics.data);
        setCompany(profile.data);
        setNotifications(notificationData.data || []);
      })
      .catch(() => toast.error("Unable to load company dashboard"))
      .finally(() => setLoading(false));
  }, [id]);

  const responseRate = useMemo(
    () => (stats.applications ? Math.round(((stats.applications - stats.pending) / stats.applications) * 100) : 0),
    [stats],
  );
  const cards = [
    { label: "Active jobs", value: stats.jobs, icon: <BriefcaseBusiness size={21} />, color: "bg-blue-50 text-blue-600" },
    { label: "Applications", value: stats.applications, icon: <Users size={21} />, color: "bg-violet-50 text-violet-600" },
    { label: "Pending review", value: stats.pending, icon: <Clock3 size={21} />, color: "bg-amber-50 text-amber-600" },
  ];

  if (loading) return <div className="card p-10 text-center text-muted">Loading company dashboard...</div>;
  return (
    <div className="space-y-6 fade-up">
      <div className="rounded-2xl bg-primary p-6 text-white sm:p-8">
        <p className="text-sm text-white/75">Company workspace</p>
        <h1 className="mt-2 text-3xl font-bold">Welcome{company?.company_name ? `, ${company.company_name}` : ""}</h1>
        <p className="mt-2 max-w-xl text-white/80">Manage your hiring pipeline, review applicants, and grow your team.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => <div key={card.label} className="card flex items-center justify-between p-5"><div><p className="text-sm text-muted">{card.label}</p><p className="mt-2 text-3xl font-bold">{card.value}</p></div><div className={`rounded-xl p-3 ${card.color}`}>{card.icon}</div></div>)}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6"><div className="mb-5 flex items-center justify-between"><div><h2 className="text-xl font-semibold">Hiring pipeline</h2><p className="text-sm text-muted">Applications needing attention</p></div><Activity className="text-primary" /></div><div className="space-y-5"><div><div className="mb-2 flex justify-between text-sm"><span>Pending review</span><b>{stats.pending}</b></div><div className="h-3 rounded-full bg-slate-100 dark:bg-slate-200"><div className="h-3 rounded-full bg-amber-500" style={{ width: `${stats.applications ? (stats.pending / stats.applications) * 100 : 0}%` }} /></div></div><div><div className="mb-2 flex justify-between text-sm"><span>Reviewed</span><b>{stats.applications - stats.pending}</b></div><div className="h-3 rounded-full bg-slate-100 dark:bg-slate-200"><div className="h-3 rounded-full bg-primary" style={{ width: `${responseRate}%` }} /></div></div></div></div>
        <div className="card p-6"><h2 className="text-xl font-semibold">Quick overview</h2><div className="mt-5 space-y-4"><div className="flex items-center gap-3 rounded-xl bg-green-50 p-4 text-green-700"><CheckCircle2 /><span><b>{responseRate}%</b> of applications reviewed</span></div><p className="text-sm leading-6 text-muted">Keep your job posts current and respond quickly to strong candidates to improve your hiring experience.</p></div></div>
      </div>
      <div className="card p-6">
        <div className="mb-5 flex items-center justify-between"><div><h2 className="text-xl font-semibold">Company notifications</h2><p className="text-sm text-muted">Applications, interviews, and hiring updates</p></div><Bell className="text-primary" /></div>
        {notifications.length === 0 ? <p className="py-5 text-center text-muted">No notifications yet.</p> : <div className="grid gap-3 md:grid-cols-2">{notifications.slice(0, 6).map((notification) => <div key={notification.id} className="rounded-xl border border-border p-3"><p className="font-medium">{notification.title}</p><p className="mt-1 text-sm text-muted">{notification.message}</p><p className="mt-1 text-xs text-muted">{new Date(notification.created_at).toLocaleString()}</p></div>)}</div>}
      </div>
    </div>
  );
};

export default CompanyDashboard;
