import { useEffect, useState } from "react";
import { getMyNotifications } from "../../services/authService";
import { Bell } from "lucide-react";
import { useToast } from "../../components/Toast";

type Notification = {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

const CandidateNotifications = () => {
  const [notes, setNotes] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    getMyNotifications().then(res => setNotes(res.data || [])).catch(() => toast.error("Unable to load notifications")).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 fade-up">
      <div><h1 className="text-3xl font-bold">Notifications</h1><p className="mt-1 text-muted">Updates about your applications and interviews.</p></div>
      {loading ? <div className="card p-10 text-center text-muted">Loading notifications...</div> : notes.length === 0 ? <div className="card p-10 text-center"><Bell className="mx-auto mb-3 text-muted" /><p className="text-muted">You have no notifications.</p></div> : notes.map((n) => (
        <div key={n.id} className={`card flex gap-4 p-5 ${n.is_read ? "" : "border-primary/40 bg-primary/5"}`}><div className="rounded-full bg-primary/10 p-3 text-primary"><Bell size={18} /></div><div><h2 className="font-bold">{n.title}</h2><p className="mt-1 text-muted">{n.message}</p><p className="mt-2 text-xs text-muted">{new Date(n.created_at).toLocaleString()}</p></div></div>
      ))}
    </div>
  );
};

export default CandidateNotifications;