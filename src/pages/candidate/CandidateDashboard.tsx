import { useEffect, useState } from "react";
import {
  getMyApplications,
  getMyInterviews,
  getMyNotifications,
} from "../../services/authService";

const CandidateDashboard = () => {

  const [apps, setApps] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getMyApplications().then(res => setApps(res.data));
    getMyInterviews().then(res => setInterviews(res.data));
    getMyNotifications().then(res => setNotifications(res.data));
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-4 fade-up">

      <div className="card p-5">
        <h2>Applications</h2>
        <p className="text-3xl">{apps.length}</p>
      </div>

      <div className="card p-5">
        <h2>Interviews</h2>
        <p className="text-3xl">{interviews.length}</p>
      </div>

      <div className="card p-5">
        <h2>Notifications</h2>
        <p className="text-3xl">{notifications.length}</p>
      </div>

    </div>
  );
};

export default CandidateDashboard;