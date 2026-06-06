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
import Settings from "../pages/admin/Settings";

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
          path="/candidate/dashboard"
          element={
            <ProtectedRoute role="candidate">
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

        {/* COMPANY */}
        <Route
          path="/company/dashboard"
          element={
            <ProtectedRoute role="company">
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />

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
          <Route path="settings" element={<Settings />} />
        </Route>

      </Route>
    </Routes>
  );
};

export default AppRoutes;