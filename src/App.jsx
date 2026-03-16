import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Messages from './pages/Messages';
import Calendar from './pages/Calendar';
import HealthLogs from './pages/HealthLogs';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import Onboarding from './pages/Onboarding';

export default function App() {
  return (
    <Routes>
      {/* Public / auth routes (no app shell) */}
      <Route path="/" element={<Onboarding />} />
      <Route path="/signin" element={<SignIn />} />

      {/* App routes (with shared layout) */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/health-logs" element={<HealthLogs />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
