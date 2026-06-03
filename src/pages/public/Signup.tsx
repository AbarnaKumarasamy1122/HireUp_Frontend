import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

const Signup = () => {

  const navigate = useNavigate();

  const [tab, setTab] = useState<"candidate" | "employer">(
    "candidate"
  );

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {

    try {

      await registerUser({
        email: form.email,
        password: form.password,

        first_name: form.firstName,
        last_name: form.lastName,

        role: tab,

        company_name:
          tab === "employer"
            ? form.companyName
            : "",
      });

      alert("Account created successfully");

      navigate("/login");

    } catch (err: any) {
      alert(err.response?.data?.error || "Signup failed");
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
                Join HireUp
              </h1>

              <p className="mt-5 text-lg opacity-90">
                Create your account as a Candidate or Employer and start hiring or applying instantly.
              </p>

              <div className="mt-8">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:scale-105 transition"
                >
                  Login Account
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-background flex items-center justify-center p-8 lg:p-14">
            <div className="w-full max-w-md">

              <h2 className="text-3xl font-bold mb-2">Create Account</h2>

              <p className="text-muted mb-8">
                Start your journey with HireUp
              </p>

              {/* TABS */}
              <div className="flex mb-6 border border-border rounded-xl overflow-hidden">
                <button
                  className={`flex-1 py-3 font-medium transition ${
                    tab === "candidate"
                      ? "bg-primary text-white"
                      : "bg-background hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                  onClick={() => setTab("candidate")}
                >
                  Candidate
                </button>

                <button
                  className={`flex-1 py-3 font-medium transition ${
                    tab === "employer"
                      ? "bg-primary text-white"
                      : "bg-background hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                  onClick={() => setTab("employer")}
                >
                  Employer
                </button>
              </div>

              {/* FORM */}
              {tab === "candidate" ? (
                <div className="space-y-4">

                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full border border-border rounded-xl px-4 py-3"
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full border border-border rounded-xl px-4 py-3"
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                  />

                  <input
                    type="email"
                    placeholder="Work Email"
                    className="w-full border border-border rounded-xl px-4 py-3"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-border rounded-xl px-4 py-3"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />

                </div>
              ) : (
                <div className="space-y-4">

                  <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full border border-border rounded-xl px-4 py-3"
                    onChange={(e) =>
                      setForm({ ...form, companyName: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full border border-border rounded-xl px-4 py-3"
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full border border-border rounded-xl px-4 py-3"
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                  />

                  <input
                    type="email"
                    placeholder="Work Email"
                    className="w-full border border-border rounded-xl px-4 py-3"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-border rounded-xl px-4 py-3"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />

                </div>
              )}

              {/* BUTTON */}
              <button
                onClick={handleSignup}
                className="btn-primary w-full py-3 text-lg mt-6"
              >
                Create Account
              </button>

              {/* FOOTER */}
              <p className="text-center text-sm text-muted mt-6">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-primary cursor-pointer font-medium hover:underline"
                >
                  Login
                </span>
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;