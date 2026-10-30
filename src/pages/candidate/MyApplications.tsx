import { useEffect, useMemo, useState } from "react";
import { BriefcaseBusiness, CalendarDays, MapPin, Search } from "lucide-react";
import { getMyApplications } from "../../services/authService";
import { useToast } from "../../components/Toast";

type Application = {
  id: number;
  job_title: string;
  company_name?: string;
  location?: string;
  location_type?: string;
  salary?: string;
  status: string;
  created_at: string;
};

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  shortlisted: "bg-blue-50 text-blue-700",
  accepted: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
};

const MyApplications = () => {
  const toast = useToast();
  const [apps, setApps] = useState<Application[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyApplications()
      .then(({ data }) => setApps(data || []))
      .catch(() => toast.error("Unable to load your applications"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => apps.filter((app) => {
    const matchesStatus = filter === "all" || app.status === filter;
    const keyword = search.toLowerCase();
    return matchesStatus && `${app.job_title} ${app.company_name || ""}`.toLowerCase().includes(keyword);
  }), [apps, filter, search]);

  return (
    <div className="space-y-6 fade-up">
      <div><h1 className="text-3xl font-bold">My Applications</h1><p className="mt-1 text-muted">Follow every opportunity from submitted to decided.</p></div>
      <div className="card flex flex-col gap-3 p-4 sm:flex-row">
        <div className="flex flex-1 items-center gap-3 rounded-lg border border-border px-3"><Search size={18} className="text-muted" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search applications..." className="w-full bg-transparent py-2 outline-none" /></div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-lg border border-border bg-background px-3 py-2 capitalize outline-none"><option value="all">All statuses</option><option value="pending">Pending</option><option value="shortlisted">Shortlisted</option><option value="accepted">Accepted</option><option value="rejected">Rejected</option></select>
      </div>
      {loading ? <div className="card p-10 text-center text-muted">Loading applications...</div> : filtered.length === 0 ? <div className="card p-10 text-center"><BriefcaseBusiness className="mx-auto mb-3 text-muted" size={32} /><p className="font-medium">No applications found</p><p className="mt-1 text-sm text-muted">Try another filter or browse available jobs.</p></div> : <div className="grid gap-4">{filtered.map((app) => <article key={app.id} className="card p-5 transition hover:shadow-md"><div className="flex flex-col justify-between gap-4 sm:flex-row"><div><div className="flex items-start gap-3"><div className="rounded-xl bg-primary/10 p-3 text-primary"><BriefcaseBusiness size={21} /></div><div><h2 className="text-lg font-bold">{app.job_title}</h2><p className="text-primary">{app.company_name || "Company"}</p></div></div><div className="mt-4 flex flex-wrap gap-4 text-sm text-muted"><span className="flex items-center gap-1"><MapPin size={15} />{app.location || "Remote"}</span><span className="capitalize">{app.location_type || "Workplace"}</span>{app.salary && <span>{app.salary}</span>}<span className="flex items-center gap-1"><CalendarDays size={15} />Applied {new Date(app.created_at).toLocaleDateString()}</span></div></div><span className={`h-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[app.status] || "bg-slate-100 text-slate-700"}`}>{app.status}</span></div></article>)}</div>}
    </div>
  );
};

export default MyApplications;
