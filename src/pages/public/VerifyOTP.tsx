import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../../components/Toast";
import { verifyOTP } from "../../services/authService";

const VerifyOTP = () => {
  const { state } = useLocation();
  const email = state?.email;

  const toast = useToast();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // HANDLE CHANGE
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // HANDLE BACKSPACE
  const handleKeyDown = (e: any, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (!email) {
      toast.error("Session expired. Please restart password reset.");
      return;
    }

    if (finalOtp.length !== 6) {
      toast.error("Please enter full 6-digit OTP");
      return;
    }

    try {
      // 🔥 CALL BACKEND TO VERIFY OTP
      await verifyOTP(email, finalOtp);

      toast.success("OTP verified successfully");

      // ONLY navigate if OTP is correct
      navigate("/reset-password", {
        state: { email, otp: finalOtp },
      });

    } catch (err: any) {
      toast.error(err.response?.data?.error || "Invalid or expired OTP");
    }
  };

  return (
    <div className="flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md card p-6 md:p-8 fade-up">

        <h2 className="text-2xl font-bold text-center">
          Verify OTP
        </h2>

        <p className="text-muted text-center text-sm mt-2">
          Enter the 6-digit OTP sent to your email
        </p>

        {/* OTP INPUTS */}
        <div className="flex justify-between gap-2 mt-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg font-bold border border-border rounded-xl focus:ring-2 focus:ring-primary/30"
            />
          ))}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleVerify}
          className="btn-primary w-full mt-6 py-3 cursor-pointer"
        >
          Verify OTP
        </button>

      </div>
    </div>
  );
};

export default VerifyOTP;