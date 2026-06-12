import { useEffect, useState } from "react";
import {
  approveCompany,
  getPendingCompanies,
  rejectCompany,
} from "../../services/authService";
import { useToast } from "../../components/Toast";

const ApproveCompanies = () => {
  const toast = useToast();

  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const loadCompanies = async () => {
    try {
      setLoading(true);

      const res = await getPendingCompanies();
      setCompanies(res.data);
    } catch (err: any) {
      toast.error(
        err.response?.data?.error || "Failed to load companies"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      setActionLoading(id);

      await approveCompany(id);

      toast.success("Company approved successfully");

      loadCompanies();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Approval failed");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: number) => {
    try {
      setActionLoading(id);

      await rejectCompany(id);

      toast.success("Company rejected successfully");

      loadCompanies();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Rejection failed");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="bg-background px-4 py-10">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          Approve Companies
        </h1>
        <p className="text-muted mt-2">
          Review and approve pending company registrations
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-10 text-muted">
          Loading pending companies...
        </div>
      ) : companies.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold text-muted">
            No companies for approval
          </h2>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {companies.map((company) => (
            <div key={company.id} className="card p-5 hover:shadow-lg transition">
              <h2 className="text-xl font-bold">
                {company.company_name}
              </h2>

              <p className="text-muted text-sm mt-1">
                {company.company_description}
              </p>

              <div className="mt-4 space-y-2 text-sm">
                <p>📧 {company.email}</p>
                <p>📞 {company.company_contact}</p>
                <p>🌐 {company.company_website}</p>
                <p>📍 {company.company_address}</p>
              </div>

              <a
                href={company.verified_document}
                target="_blank"
                className="inline-block mt-4 text-primary underline text-sm"
              >
                View Verification Document →
              </a>

              <div className="flex gap-4 mt-6">
                <button
                  disabled={actionLoading === company.id}
                  onClick={() => handleApprove(company.id)}
                  className="bg-green-500 w-full text-white py-2 rounded-lg disabled:opacity-50"
                >
                  {actionLoading === company.id ? "Processing..." : "Approve"}
                </button>

                <button
                  disabled={actionLoading === company.id}
                  onClick={() => handleReject(company.id)}
                  className="bg-red-500 w-full text-white py-2 rounded-lg disabled:opacity-50"
                >
                  {actionLoading === company.id ? "Processing..." : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApproveCompanies;