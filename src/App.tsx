/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PromptGenerator from './pages/PromptGenerator';
import History from './pages/History';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import ModelComparison from './components/ModelComparison';
import ChatAssistant from './components/ChatAssistant';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/generator" element={<PromptGenerator />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/compare" element={<ModelComparison />} />
        </Routes>
        <ChatAssistant />
      </BrowserRouter>
    </AuthProvider>
  );
}
