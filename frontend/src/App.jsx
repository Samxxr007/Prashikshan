import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

import StudentLayout from "./layouts/StudentLayout";
import Dashboard from "./pages/Dashboard";
import StudentProfile from "./pages/StudentProfile";
import ViewStudentProfile from "./pages/ViewStudentProfile";
import Recommendations from "./pages/Recommendations";
import ViewProjects from "./pages/ViewProjects";
import GeminiHub from "./pages/GeminiHub";

import IndustryLayout from "./layouts/IndustryLayout";
import IndustryDashboard from "./pages/IndustryDashboard";
import PostProject from "./pages/PostProject";
import IndustryProfile from "./pages/IndustryProfile";
import Students from "./pages/Students";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProjects from "./pages/AdminProjects";
import AdminCompanies from "./pages/AdminCompanies";
import AdminReports from "./pages/AdminReports";
import AdminSettings from "./pages/AdminSettings";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student Routes */}
      <Route element={<StudentLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/view" element={<ViewStudentProfile />} />
        <Route path="/student/view/:email" element={<ViewStudentProfile />} />
        <Route path="/student/recommend" element={<Recommendations />} />
        <Route path="/student/gemini" element={<GeminiHub />} />
        <Route path="/projects" element={<ViewProjects />} />
      </Route>

      {/* Industry Routes */}
      <Route element={<IndustryLayout />}>
        <Route path="/industry/dashboard" element={<IndustryDashboard />} />
        <Route path="/industry/project" element={<PostProject />} />
        <Route path="/industry/profile" element={<IndustryProfile />} />
        <Route path="/industry/view" element={<ViewProjects />} />
        <Route path="/industry/students" element={<Students />} />
        <Route path="/industry/view/:email" element={<ViewStudentProfile />} />
        <Route path="/industry/companies" element={<AdminCompanies />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<AdminDashboard />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route path="/admin/companies" element={<AdminCompanies />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}
