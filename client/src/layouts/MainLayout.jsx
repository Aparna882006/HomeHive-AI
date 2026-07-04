import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { Outlet, useLocation } from "react-router-dom";

// Pages that use the dashboard layout
const DASHBOARD_PATHS = [
  "/dashboard",
  "/chat",
  "/profile",
  "/notifications",
];

export default function MainLayout() {
  const { pathname } = useLocation();

  const isDashboard = DASHBOARD_PATHS.some((p) =>
    pathname.startsWith(p)
  );

  return (
    <div className="mesh-bg min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {!isDashboard && <Footer />}
    </div>
  );
}