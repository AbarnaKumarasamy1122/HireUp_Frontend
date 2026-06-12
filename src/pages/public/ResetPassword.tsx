import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/authService";
import { useToast } from "../../components/Toast";

const ResetPassword = () => {
  const { state } = useLocation();
  const email = state?.email;
  const otp = state?.otp;

  const toast = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const validatePassword = (pwd: string) => {
    return pwd.length >= 6;
  };

  const handleReset = async () => {
    if (!email || !otp) {
      toast.error("Invalid reset session. Try again.");
      return;
    }

    if (!password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPassword(email, otp, password);

      toast.success("Password updated successfully");
      navigate("/login");

    } catch (err: any) {
      toast.error(err.response?.data?.error || "Reset failed");
    }
  };

  return (
    <div className="flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md card p-6 md:p-8 fade-up">

        <h2 className="text-2xl font-bold text-center">
          Reset Password
        </h2>

        <p className="text-muted text-center text-sm mt-2">
          Create a new secure password
        </p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-6 px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/30"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mt-3 px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/30"
        />

        <button
          onClick={handleReset}
          className="btn-primary w-full mt-5 py-3 cursor-pointer"
        >
          Update Password
        </button>

      </div>
    </div>
  );
};

export default ResetPassword;