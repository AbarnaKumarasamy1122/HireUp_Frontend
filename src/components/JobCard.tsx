const JobCard = ({ job }: any) => {
  return (
    <div className="card p-4 hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p className="text-muted">{job.location}</p>
      <p className="mt-2">{job.description}</p>

      <button className="btn-primary mt-3">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;