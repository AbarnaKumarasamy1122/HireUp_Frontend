import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const { state } = useLocation();
  const email = state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const navigate = useNavigate();

  // HANDLE CHANGE
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return; // only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next box
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

  const handleVerify = () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      return alert("Enter full 6-digit OTP");
    }

    navigate("/reset-password", {
      state: { email, otp: finalOtp },
    });
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

        {/* OTP BOXES */}
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
          className="btn-primary w-full mt-6 py-3"
        >
          Verify OTP
        </button>

      </div>

    </div>
  );
};

export default VerifyOTP;