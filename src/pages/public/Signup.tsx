import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { imagekit } from "../../utils/imagekit";
import axios from "axios";
import { useToast } from "../../components/Toast";

const Signup = () => {

  const toast = useToast();

  const navigate = useNavigate();

  const [tab, setTab] = useState<"candidate" | "company">("candidate");

  const [document, setDocument] = useState<any>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",

    companyName: "",
    companyAddress: "",
    companyContact: "",
    companyWebsite: "",
    companyDescription: "",
    verifiedDocument: "",

    email: "",
    password: "",
  });

  const uploadDocument = async () => {

    if (!document) return "";

    const authRes = await axios.get(
      "http://127.0.0.1:8000/api/imagekit-auth/"
    );

    const response =
      await imagekit.upload({

        file: document,

        fileName: document.name,

        token: authRes.data.token,

        signature:
          authRes.data.signature,

        expire:
          authRes.data.expire,
      });

    return response.url;
  };

  const validateEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

  const validatePhone = (phone: string) => {
      // allows: +94, +1, 077..., 9477..., etc.
      return /^[+]?[\d\s]{7,15}$/.test(phone);
    };

  const handleSignup = async () => {
    
    // COMMON VALIDATION
    if (!form.email || !form.password) {
      toast.error("Email and password are required");
      return;
    }

    if (!validateEmail(form.email)) {
      toast.error("Invalid email format");
      return;
    }

    // PHONE VALIDATION (NEW)
    if (!validatePhone(form.companyContact)) {
      toast.error("Invalid phone number (7–15 digits required)");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // CANDIDATE VALIDATION
    if (tab === "candidate") {
      if (!form.firstName || !form.lastName) {
        toast.error("First name and last name are required");
        return;
      }
    }

    // COMPANY VALIDATION
    if (tab === "company") {
      if (
        !form.companyName ||
        !form.companyAddress ||
        !form.companyContact ||
        !form.companyWebsite ||
        !form.companyDescription
      ) {
        toast.error("All company fields are required");
        return;
      }

      if (!document) {
        toast.error("Verification document is required");
        return;
      }
    }

    try {

      let documentUrl = "";

      if (
        tab === "company" &&
        document
      ) {

        documentUrl =
          await uploadDocument();
      }

      await registerUser({

        role: tab,

        email: form.email,

        password: form.password,

        first_name: form.firstName,

        last_name: form.lastName,

        company_name:
          form.companyName,

        company_address:
          form.companyAddress,

        company_contact:
          form.companyContact,

        company_website:
          form.companyWebsite,

        company_description:
          form.companyDescription,

        verified_document:
          documentUrl,
      });
      toast.success(
        tab === "company"
          ? "Registration submitted for admin approval"
          : "Account created successfully"
      );

      navigate("/login");

    } catch (err: any) {

      toast.error(
        err.response?.data?.error || "Signup failed"
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
                Join HireUp
              </h1>

              <p className="mt-5 text-lg opacity-90">
                Create your account as a Candidate or Employer and start hiring or applying instantly.
              </p>

              <div className="mt-8">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:scale-105 transition cursor-pointer"
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
                  className={`flex-1 py-3 font-medium transition cursor-pointer ${tab === "candidate"
                    ? "bg-primary text-white"
                    : "bg-background hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  onClick={() => setTab("candidate")}
                >
                  Candidate
                </button>

                <button
                  className={`flex-1 py-3 font-medium transition cursor-pointer ${tab === "company"
                    ? "bg-primary text-white"
                    : "bg-background hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  onClick={() => setTab("company")}
                >
                  Company
                </button>
              </div>

              {/* CANDIDATE */}
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
                    placeholder="Company Address"
                    className="w-full border border-border rounded-xl px-4 py-3"
                    onChange={(e) =>
                      setForm({ ...form, companyAddress: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Company Contact Number"
                    className="w-full border border-border rounded-xl px-4 py-3"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        companyContact: e.target.value.replace(/[^0-9+]/g, "")
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Company Website"
                    className="w-full border border-border rounded-xl px-4 py-3"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        companyWebsite: e.target.value
                      })
                    }
                  />

                  <textarea
                    placeholder="Company Description"
                    className="w-full border border-border rounded-xl px-4 py-3"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        companyDescription: e.target.value
                      })
                    }
                  />

                  <label className="block text-sm font-medium text-gray-700">
                    Upload Verification Document
                  </label>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    onChange={(e: any) =>
                      setDocument(e.target.files[0])
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
                className="btn-primary w-full py-3 text-lg mt-6 cursor-pointer"
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