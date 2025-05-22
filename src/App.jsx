// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// // Import page components
// import SocialSyncLanding from "./pages/SocialSyncLanding";
// import AuthPage from "./pages/AuthPage";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import SocialDashboard from "./pages/SocialDashboard";
// import Dashboard from "./pages/Dashboard";
// import CalendarPage from "./pages/CalendarPage";
// import ContentCalendar from "./pages/ContentCalendar";
// import CreateCampaign from "./pages/CreateCampaign";
// import CampaignPage from "./pages/CampaignPage";
// import CreatePost from "./pages/CreatePost";
// import ChatSupport from "./pages/ChatSupport";
// import DraftsPage from "./pages/DraftsPage";
// import Accounts from "./pages/Accounts";
// import SavedCampaigns from "./pages/SavedCampaigns";

// // Mock auth function - replace with real auth state management (e.g., context, Redux, Zustand)
// const useAuth = () => {
//   // Example: Check if a user token exists in localStorage
//   // const token = localStorage.getItem('authToken');
//   // return { isAuthenticated: !!token };
//   return { isAuthenticated: false }; // Default to not authenticated
// };

// // ProtectedRoute component
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   // Uncomment when real auth is implemented
//   // if (!isAuthenticated) {
//   //   return <Navigate to="/auth" replace />;
//   // }
//   return children;
// };

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Landing Page - Default route */}
//         <Route path="/" element={<SocialSyncLanding />} />

//         {/* Authentication Routes */}
//         <Route path="/auth" element={<AuthPage />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />

//         {/* Protected Routes */}
//         <Route
//           path="/social-dashboard"
//           element={
//             <ProtectedRoute>
//               <SocialDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/calendar"
//           element={
//             <ProtectedRoute>
//               <CalendarPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/content-calendar"
//           element={
//             <ProtectedRoute>
//               <ContentCalendar />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/create-campaign"
//           element={
//             <ProtectedRoute>
//               <CreateCampaign />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/campaign"
//           element={
//             <ProtectedRoute>
//               <CampaignPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/saved-campaigns"
//           element={
//             <ProtectedRoute>
//               <SavedCampaigns />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/campaign/:campaignId"
//           element={
//             <ProtectedRoute>
//               <CampaignPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/create-post"
//           element={
//             <ProtectedRoute>
//               <CreatePost />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/chat-support"
//           element={
//             <ProtectedRoute>
//               <ChatSupport />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/drafts-page"
//           element={
//             <ProtectedRoute>
//               <DraftsPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/accounts"
//           element={
//             <ProtectedRoute>
//               <Accounts />
//             </ProtectedRoute>
//           }
//         />

//         {/* Redirects for legacy paths */}
//         <Route path="/login" element={<Navigate to="/auth" replace />} />
//         <Route path="/register" element={<Navigate to="/auth" replace />} />

//         {/* Optional: Catch-all for 404 */}
//         {/* <Route path="*" element={<NotFoundPage />} /> */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Page Components
import SocialSyncLanding from './pages/SocialSyncLanding';
import AuthPage from './pages/AuthPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import SocialDashboard from './pages/SocialDashboard';
import Accounts from './pages/Accounts';
import CalendarPage from './pages/CalendarPage';
import ContentCalendar from './pages/ContentCalendar';
import CreateCampaign from './pages/CreateCampaign';
import CampaignPage from './pages/CampaignPage';
import CreatePost from './pages/CreatePost';
import ChatSupport from './pages/ChatSupport';
import DraftsPage from './pages/DraftsPage';
import SavedCampaigns from './pages/SavedCampaigns';

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return currentUser ? <Outlet /> : <Navigate to="/auth" replace />;
};

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar would go here */}
      <div className="flex-1">
        {/* Navbar would go here */}
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SocialSyncLanding />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/social-dashboard" element={<SocialDashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/content-calendar" element={<ContentCalendar />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/campaign" element={<CampaignPage />} />
            <Route path="/campaign/:campaignId" element={<CampaignPage />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/chat-support" element={<ChatSupport />} />
            <Route path="/drafts" element={<DraftsPage />} />
            <Route path="/saved-campaigns" element={<SavedCampaigns />} />
          </Route>
        </Route>

        {/* Redirects */}
        <Route path="/login" element={<Navigate to="/auth" replace />} />
        <Route path="/register" element={<Navigate to="/auth" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;