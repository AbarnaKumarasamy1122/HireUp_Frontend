import { useEffect, useState } from "react";
import { Activity, BriefcaseBusiness, Users, Clock3 } from "lucide-react";
import { getCompanyAnalytics } from "../../services/authService";
import { getStoredValue } from "../../context/AuthContext";
import { useToast } from "../../components/Toast";

type AnalyticsData = { jobs: number; applications: number; pending: number };

const Analytics = () => {
  const toast = useToast();
  const [data, setData] = useState<AnalyticsData>({ jobs: 0, applications: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(getStoredValue("user") || "{}");

  useEffect(() => {
    if (!user.id) return;
    getCompanyAnalytics(user.id).then(({ data: result }) => setData(result)).catch(() => toast.error("Unable to load analytics")).finally(() => setLoading(false));
  }, []);

  const reviewed = data.applications - data.pending;
  const metrics = [
    { label: "Jobs posted", value: data.jobs, icon: <BriefcaseBusiness />, color: "text-blue-600 bg-blue-50" },
    { label: "Applications", value: data.applications, icon: <Users />, color: "text-violet-600 bg-violet-50" },
    { label: "Pending", value: data.pending, icon: <Clock3 />, color: "text-amber-600 bg-amber-50" },
    { label: "Reviewed", value: reviewed, icon: <Activity />, color: "text-green-600 bg-green-50" },
  ];
  if (loading) return <div className="card p-10 text-center text-muted">Loading analytics...</div>;
  return <div className="space-y-6 fade-up"><div><h1 className="text-3xl font-bold">Analytics</h1><p className="mt-1 text-muted">Understand your recruitment activity at a glance.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{metrics.map((metric) => <div key={metric.label} className="card p-5"><div className={`mb-4 inline-flex rounded-xl p-3 ${metric.color}`}>{metric.icon}</div><p className="text-sm text-muted">{metric.label}</p><p className="mt-1 text-3xl font-bold">{metric.value}</p></div>)}</div><div className="card p-6"><div className="mb-6 flex items-center gap-3"><Activity className="text-primary" /><div><h2 className="text-xl font-semibold">Application activity</h2><p className="text-sm text-muted">Reviewed versus awaiting review</p></div></div><div className="space-y-5"><div><div className="mb-2 flex justify-between text-sm"><span>Reviewed</span><span>{reviewed}</span></div><div className="h-4 rounded-full bg-slate-100 dark:bg-slate-200"><div className="h-4 rounded-full bg-green-500" style={{ width: `${data.applications ? (reviewed / data.applications) * 100 : 0}%` }} /></div></div><div><div className="mb-2 flex justify-between text-sm"><span>Pending</span><span>{data.pending}</span></div><div className="h-4 rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-4 rounded-full bg-amber-500" style={{ width: `${data.applications ? (data.pending / data.applications) * 100 : 0}%` }} /></div></div></div></div></div>;
};

export default Analytics;
