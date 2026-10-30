import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  Bell,
  Mail,
  Users,
} from "lucide-react";
import { getAdminContactMessages, getAdminDashboard, getAdminNotifications } from "../../services/authService";
import { useToast } from "../../components/Toast";

type DashboardData = {
  candidates: number;
  companies: number;
  approved_companies: number;
  pending_companies: number;
  rejected_companies: number;
  jobs: number;
  applications: number;
  applications_by_status: Record<string, number>;
};
type AdminNotification = { id: number; title: string; message: string; created_at: string };
type ContactMessage = { id: number; name: string; email: string; message: string; created_at: string };

const emptyData: DashboardData = {
  candidates: 0,
  companies: 0,
  approved_companies: 0,
  pending_companies: 0,
  rejected_companies: 0,
  jobs: 0,
  applications: 0,
  applications_by_status: {},
};

const AdminDashboard = () => {
  const toast = useToast();
  const [data, setData] = useState(emptyData);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    Promise.all([getAdminDashboard(), getAdminNotifications(), getAdminContactMessages()])
      .then(([dashboard, notificationData, messageData]) => {
        setData(dashboard.data);
        setNotifications(notificationData.data || []);
        setMessages(messageData.data || []);
      })
      .catch(() => toast.error("Unable to load admin dashboard"))
      .finally(() => setLoading(false));
  }, []);

  const maxApplicationCount = Math.max(
    ...Object.values(data.applications_by_status),
    1,
  );
  const reviewedApplications =
    data.applications -
    (data.applications_by_status.pending || 0);
  const companyTotal = Math.max(data.companies, 1);
  const companyMetrics = useMemo(
    () => [
      { label: "Approved", value: data.approved_companies, color: "bg-green-500" },
      { label: "Pending", value: data.pending_companies, color: "bg-amber-500" },
      { label: "Rejected", value: data.rejected_companies, color: "bg-red-500" },
    ],
    [data],
  );
  const cards = [
    { label: "Candidates", value: data.candidates, icon: <Users />, color: "bg-blue-50 text-blue-600" },
    { label: "Companies", value: data.companies, icon: <Building2 />, color: "bg-violet-50 text-violet-600" },
    { label: "Jobs posted", value: data.jobs, icon: <BriefcaseBusiness />, color: "bg-emerald-50 text-emerald-600" },
    { label: "Applications", value: data.applications, icon: <FileText />, color: "bg-amber-50 text-amber-600" },
  ];

  if (loading) {
    return <div className="card p-10 text-center text-muted">Loading admin dashboard...</div>;
  }

  return (
    <div className="space-y-6 fade-up">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-muted">Monitor platform activity and manage the HireUp marketplace.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="card flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted">{card.label}</p>
              <p className="mt-2 text-3xl font-bold">{card.value}</p>
            </div>
            <div className={`rounded-xl p-3 ${card.color}`}>{card.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Company approvals</h2>
              <p className="text-sm text-muted">Current registration status</p>
            </div>
            <Building2 className="text-primary" />
          </div>
          <div className="space-y-5">
            {companyMetrics.map((metric) => (
              <div key={metric.label}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{metric.label}</span>
                  <b>{metric.value}</b>
                </div>
                <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-200">
                  <div
                    className={`h-3 rounded-full ${metric.color}`}
                    style={{ width: `${(metric.value / companyTotal) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Application pipeline</h2>
              <p className="text-sm text-muted">Applications by current status</p>
            </div>
            <Activity className="text-primary" />
          </div>
          <div className="space-y-4">
            {["pending", "shortlisted", "accepted", "rejected"].map((status) => {
              const value = data.applications_by_status[status] || 0;
              return (
                <div key={status} className="flex items-center gap-3">
                  <span className="w-24 text-sm capitalize">{status}</span>
                  <div className="h-3 flex-1 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-3 rounded-full bg-primary" style={{ width: `${(value / maxApplicationCount) * 100}%` }} />
                  </div>
                  <b className="w-8 text-right text-sm">{value}</b>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="card flex items-center gap-3 p-5"><CheckCircle2 className="text-green-600" /><span><b>{data.approved_companies}</b> approved companies</span></div>
        <div className="card flex items-center gap-3 p-5"><Clock3 className="text-amber-600" /><span><b>{data.pending_companies}</b> awaiting approval</span></div>
        <div className="card flex items-center gap-3 p-5"><FileText className="text-primary" /><span><b>{reviewedApplications}</b> reviewed applications</span></div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <div className="mb-5 flex items-center justify-between">
            <div><h2 className="text-xl font-semibold">Notifications</h2><p className="text-sm text-muted">Recent platform activity</p></div>
            <Bell className="text-primary" />
          </div>
          {notifications.length === 0 ? <p className="py-6 text-center text-muted">No notifications yet.</p> : <div className="space-y-3">{notifications.slice(0, 6).map((notification) => <div key={notification.id} className="rounded-xl border border-border p-3"><p className="font-medium">{notification.title}</p><p className="mt-1 text-sm text-muted">{notification.message}</p><p className="mt-1 text-xs text-muted">{new Date(notification.created_at).toLocaleString()}</p></div>)}</div>}
        </div>
        <div className="card p-6">
          <div className="mb-5 flex items-center justify-between">
            <div><h2 className="text-xl font-semibold">Contact messages</h2><p className="text-sm text-muted">Messages from the public contact form</p></div>
            <Mail className="text-primary" />
          </div>
          {messages.length === 0 ? <p className="py-6 text-center text-muted">No messages yet.</p> : <div className="space-y-3">{messages.slice(0, 6).map((message) => <div key={message.id} className="rounded-xl border border-border p-3"><div className="flex items-center justify-between gap-3"><p className="font-medium">{message.name}</p><a className="text-xs text-primary" href={`mailto:${message.email}`}>{message.email}</a></div><p className="mt-2 text-sm text-muted">{message.message}</p><p className="mt-1 text-xs text-muted">{new Date(message.created_at).toLocaleString()}</p></div>)}</div>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
