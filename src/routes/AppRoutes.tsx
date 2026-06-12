import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Jobs from "../pages/public/Jobs";
import Companies from "../pages/public/Companies";
import Contact from "../pages/public/Contact";
import Login from "../pages/public/Login";
import ForgotPassword from "../pages/public/ForgotPassword";
import VerifyOTP from "../pages/public/VerifyOTP";
import ResetPassword from "../pages/public/ResetPassword";
import Signup from "../pages/public/Signup";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import CandidateDashboard from "../pages/candidate/CandidateDashboard";
import CompanyDashboard from "../pages/company/CompanyDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLayout from "../pages/admin/AdminLayout";
import ApproveCompanies from "../pages/admin/ApproveCompanies";
import ViewCompanies from "../pages/admin/ViewCompanies";
import AdminSettings from "../pages/admin/AdminSettings";
import CompanyLayout from "../pages/company/CompanyLayout";
import Analytics from "../pages/company/Analytics";
import ManageJobs from "../pages/company/ManageJobs";
import PostJob from "../pages/company/PostJob";
import Applicants from "../pages/company/Applicants";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />

        {/* CANDIDATE */}
        <Route
          path="/candidate/:id/dashboard"
          element={
            <ProtectedRoute role="candidate">
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

        {/* COMPANY */}
        <Route
          path="/company/:id"
          element={
            <ProtectedRoute role="company">
              <CompanyLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<CompanyDashboard />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="applications" element={<Applicants />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>


        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="approve-companies" element={<ApproveCompanies />} />
          <Route path="companies" element={<ViewCompanies />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

      </Route>
    </Routes>
  );
};

export default AppRoutes;