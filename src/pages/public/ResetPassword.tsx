import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/authService";

const ResetPassword = () => {
  const { state } = useLocation();
  const email = state?.email;
  const otp = state?.otp;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleReset = async () => {
    if (!password || !confirmPassword)
      return alert("All fields required");

    if (password !== confirmPassword)
      return alert("Passwords do not match");

    try {
      await resetPassword(email, otp, password);

      alert("Password updated successfully");
      navigate("/login");

    } catch (err: any) {
      alert(err.response?.data?.error || "Reset failed");
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
          className="btn-primary w-full mt-5 py-3"
        >
          Update Password
        </button>

      </div>
    </div>
  );
};

export default ResetPassword;