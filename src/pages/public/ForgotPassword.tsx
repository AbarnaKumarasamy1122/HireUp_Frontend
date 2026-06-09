import { useState } from "react";
import { sendOTP } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!email) return alert("Email is required");

    try {
      await sendOTP(email);

      alert("OTP sent successfully");

      navigate("/verify-otp", { state: { email } });

    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to send OTP");
    }
  };

  return (
    <div className="flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md card p-6 md:p-8 fade-up">

        <h2 className="text-2xl font-bold text-center">
          Forgot Password
        </h2>

        <p className="text-muted text-center mt-2 text-sm">
          Enter your email to receive OTP
        </p>

        <input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-6 px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/30"
        />

        <button
          onClick={handleSendOTP}
          className="btn-primary w-full mt-5 py-3 cursor-pointer"
        >
          Send OTP
        </button>

      </div>
    </div>
  );
};

export default ForgotPassword;