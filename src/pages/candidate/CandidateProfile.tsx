const CandidateProfile = () => {

    return (
        <div className="p-4 fade-up">

            <h1 className="text-3xl font-bold mb-4">
                My Profile
            </h1>
            <div className="card p-5 space-y-4">
                <div>
                    <h2 className="text-muted">
                        Name
                    </h2>
                    <p className="text-lg font-medium">
                        John Doe
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CandidateProfile;