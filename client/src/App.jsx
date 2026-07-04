import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MainLayout from "./layouts/MainLayout";

// Public Pages
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import PropertyDetails from "./pages/PropertyDetails/PropertyDetails";

// Authentication
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

// Tenant Dashboard
import Dashboard from "./pages/Dashboard/Dashboard";

// Owner Pages
import OwnerDashboard from "./pages/Owner/OwnerDashboard";
import AddProperty from "./pages/Owner/AddProperty";
import MyListings from "./pages/Owner/MyListings";
import EditListing from "./pages/Owner/EditListing";
import InterestedTenants from "./pages/Owner/InterestedTenants";



// Chat
import Chat from "./pages/Chat/Chat";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

function PlaceholderPage({ title }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-gray-500 mt-4">
          This page is under development.
        </p>
      </div>
    </div>
  );
}

const AIMatch = () => <PlaceholderPage title="AI Match" />;
const Profile = () => <PlaceholderPage title="Profile" />;
const Notifications = () => (
  <PlaceholderPage title="Notifications" />
);
const NotFound = () => (
  <PlaceholderPage title="404 - Page Not Found" />
);

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>

          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/ai-match" element={<AIMatch />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* TENANT */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* OWNER */}
          <Route
            path="/owner"
            element={
              <ProtectedRoute>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/add"
            element={
              <ProtectedRoute>
                <AddProperty />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/my-listings"
            element={
              <ProtectedRoute>
                <MyListings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/edit/:id"
            element={
              <ProtectedRoute>
                <EditListing />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/interested-tenants"
            element={
              <ProtectedRoute>
                <InterestedTenants />
              </ProtectedRoute>
            }
          />

          {/* CHAT */}
          <Route
            path="/chat/:interestId"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

          {/* PROFILE */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* NOTIFICATIONS */}
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#263238",
            color: "#fff",
            borderRadius: "12px",
          },
        }}
      />
    </>
  );
}