import { useEffect, useState } from "react";
import { getMyInterviews } from "../../services/authService";
import { CalendarDays } from "lucide-react";
import { useToast } from "../../components/Toast";

type Interview = {
  id: number;
  job_title: string;
  scheduled_at: string;
  meeting_link?: string | null;
  status: string;
};

const InterviewSchedules = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    getMyInterviews().then(res => setInterviews(res.data || [])).catch(() => toast.error("Unable to load interviews")).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 fade-up">
      <div><h1 className="text-3xl font-bold">Interview Schedule</h1><p className="mt-1 text-muted">Prepare for your upcoming conversations.</p></div>
      {loading ? <div className="card p-10 text-center text-muted">Loading interviews...</div> : interviews.length === 0 ? <div className="card p-10 text-center"><CalendarDays className="mx-auto mb-3 text-muted" /><p className="text-muted">No interviews scheduled yet.</p></div> : <div className="grid gap-4">{interviews.map((i) => (
        <div key={i.id} className="card flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"><div><div className="flex items-center gap-3"><CalendarDays className="text-primary" /><h2 className="text-lg font-bold">{i.job_title}</h2></div><p className="mt-2 text-muted">{new Date(i.scheduled_at).toLocaleString()}</p><span className="mt-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs capitalize text-blue-700">{i.status}</span></div>{i.meeting_link && <a className="btn-primary text-center" href={i.meeting_link} target="_blank" rel="noreferrer">Join meeting</a>}</div>
      ))}</div>}
    </div>
  );
};

export default InterviewSchedules;