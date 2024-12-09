import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CategoryProvider } from './contexts/CategoryContext';
import { NavigationProvider } from './contexts/NavigationContext';
import { NotificationProvider } from './contexts/NotificationContext';
import AuthLayout from './components/layout/AuthLayout';
import GuestLayout from './components/layout/GuestLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import TaskList from './components/tasks/TaskList';
import PeopleChart from './components/people/PeopleChart';
import QuestBoard from './components/quests/QuestBoard';
import ProfilePage from './components/profile/ProfilePage';
import GuildPage from './components/guild/GuildPage';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <NavigationProvider>
          <NotificationProvider>
            <CategoryProvider>
              <Routes>
                {/* Guest Routes */}
                <Route element={<GuestLayout />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>

                {/* Protected Routes */}
                <Route element={<AuthLayout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/tasks" element={<TaskList />} />
                  <Route path="/people" element={<PeopleChart />} />
                  <Route path="/quests" element={<QuestBoard />} />
                  <Route path="/profile/:id?" element={<ProfilePage />} />
                  <Route path="/guild" element={<GuildPage />} />
                </Route>

                {/* Root redirect */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Fallback Route */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </CategoryProvider>
          </NotificationProvider>
        </NavigationProvider>
      </AuthProvider>
    </Router>
  );
}