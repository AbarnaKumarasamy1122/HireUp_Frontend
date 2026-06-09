import { useParams } from "react-router-dom";

const CandidateDashboard = () => {

  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Candidate Dashboard
      </h1>

      <p>User ID: {id}</p>
    </div>
  );
};

export default CandidateDashboard;