import { useEffect, useState } from "react";
import { getMyInterviews } from "../../services/authService";

const InterviewSchedules = () => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    getMyInterviews().then(res => setInterviews(res.data));
  }, []);

  return (
    <div className="space-y-4">
      {interviews.map((i: any) => (
        <div key={i.id} className="card p-4">
          <h2>{i.job_title}</h2>
          <p>{new Date(i.scheduled_at).toLocaleString()}</p>
          <a href={i.meeting_link} target="_blank">Join</a>
        </div>
      ))}
    </div>
  );
};

export default InterviewSchedules;