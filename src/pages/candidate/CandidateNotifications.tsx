import { useEffect, useState } from "react";
import { getMyNotifications } from "../../services/authService";

const CandidateNotifications = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getMyNotifications().then(res => setNotes(res.data));
  }, []);

  return (
    <div className="space-y-3">
      {notes.map((n: any) => (
        <div key={n.id} className="card p-4">
          <h2 className="font-bold">{n.title}</h2>
          <p>{n.message}</p>
        </div>
      ))}
    </div>
  );
};

export default CandidateNotifications;