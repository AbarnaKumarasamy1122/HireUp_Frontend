import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useToast } from "../../components/Toast";

const Login = () => {

  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {

    // VALIDATION
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {

      const res =
        await loginUser(
          email,
          password
        );

      const {
        token,
        user,
      } = res.data;

      // SESSION STORAGE ONLY
      sessionStorage.setItem(
        "token",
        token
      );

      sessionStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      toast.success("Login successful!");

      // ROLE BASED NAVIGATION
      if (user.role === "admin") {

        navigate("/admin/dashboard");

      } else if (
        user.role === "company"
      ) {

        navigate(`/company/${user.id}/dashboard`);

      } else {

        navigate(`/candidate/${user.id}/dashboard`);
      }

    } catch (err: any) {

      toast.error(
        err.response?.data?.error ||
        "Login failed"
      );
    }
  };

  return (
    <div className="bg-background">

      {/* MAIN CONTAINER */}
      <div className="flex items-center justify-center px-4 py-4">

        {/* CARD */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl shadow-xl border border-border fade-up">

          {/* LEFT SIDE */}
          <div className="bg-primary text-white p-10 lg:p-14 flex flex-col justify-center">

            <div className="max-w-md">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Welcome to HireUp
              </h1>

              <p className="mt-5 text-lg opacity-90">
                Find your dream job or hire top talent using AI-powered hiring solutions.
              </p>

              <div className="mt-8">
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:scale-105 transition cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-background flex items-center justify-center p-8 lg:p-14">

            <div className="w-full max-w-md">

              <h2 className="text-3xl font-bold mb-2">
                Login
              </h2>

              <p className="text-muted mb-8">
                Access your HireUp account
              </p>

              {/* EMAIL */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">
                  Username or Email
                </label>

                <input
                  type="text"
                  placeholder="Enter your username or email"
                  className="w-full border border-border rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border border-border rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                {/* REMEMBER ME */}
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="checkbox"
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary cursor-pointer"
                  />
                  <span>Remember Me</span>
                </div>

                {/* FORGOT PASSWORD */}
                <p
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-primary mb-3 cursor-pointer"
                >
                  Forgot Password?
                </p>
              </div>

              {/* LOGIN BUTTON */}
              <button
                onClick={handleLogin}
                className="btn-primary w-full py-3 text-lg cursor-pointer"
              >
                Login
              </button>



              {/* FOOTER */}
              <p className="text-center text-sm text-muted mt-6">
                Don&apos;t have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="text-primary cursor-pointer font-medium hover:underline"
                >
                  Sign up
                </span>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;