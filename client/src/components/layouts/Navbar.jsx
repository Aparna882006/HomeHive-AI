import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Bell,
  Sparkles,
  Search,
  LayoutDashboard,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { supabase } from "../../lib/supabase";

function useScrollY() {
  const [y, setY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setY(window.scrollY);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return y;
}

const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
    icon: null,
  },
  {
    label: "Browse Rooms",
    href: "/explore",
    icon: Search,
  },
];

export default function Navbar() {
  const scrollY = useScrollY();
  const location = useLocation();

  const [drawer, setDrawer] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUserMenu(false);
    setDrawer(false);
  };

  const isAuth = !!user;

  const scrolled = scrollY > 60;
  const isLanding = location.pathname === "/";
  const showBg = scrolled || !isLanding;

  return (
    <>
      <header
        style={{ height: 64 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          showBg
            ? "glass shadow-sm border-b border-white/40"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold"
              style={{
                background:
                  "linear-gradient(135deg,#2E8B3C,#4ab55e)",
              }}
            >
              H
            </div>

            <span className="font-bold text-lg text-[#263238]">
              HomeHive
              <span className="text-green-600">
                {" "}
                AI
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`transition font-medium ${
                  location.pathname === item.href
                    ? "text-green-600"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
                    {/* Right Side */}

          <div className="hidden md:flex items-center gap-3">

            {isAuth ? (
              <>
                {/* Notifications */}

                <Link
                  to="/notifications"
                  className="relative p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <Bell size={20} />
                </Link>

                

                {/* User Menu */}

                <div className="relative">

                  <button
                    onClick={() => setUserMenu(!userMenu)}
                    className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-gray-100 transition"
                  >
                    <Avatar
                      initials={
                        user?.email
                          ?.substring(0, 2)
                          .toUpperCase() || "U"
                      }
                      size="sm"
                    />

                    <span className="font-medium text-sm">
                      {user?.user_metadata?.full_name ||
                        user?.email?.split("@")[0]}
                    </span>

                    <ChevronDown size={16} />
                  </button>

                  <AnimatePresence>

                    {userMenu && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -10,
                        }}
                        className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border z-50"
                      >

                        <div className="p-4 border-b">

                          <p className="font-semibold">
                            {user?.user_metadata?.full_name ||
                              "User"}
                          </p>

                          <p className="text-xs text-gray-500 truncate">
                            {user?.email}
                          </p>

                        </div>

                        <DropdownItem
                          href="/dashboard"
                          Icon={LayoutDashboard}
                          label="Dashboard"
                          onClick={() => setUserMenu(false)}
                        />

                        <DropdownItem
                          href="/profile"
                          Icon={User}
                          label="Profile"
                          onClick={() => setUserMenu(false)}
                        />

                        

                        <DropdownItem
                          href="/notifications"
                          Icon={Bell}
                          label="Notifications"
                          onClick={() => setUserMenu(false)}
                        />

                        <hr />

                        <button
                          onClick={logout}
                          className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 transition"
                        >
                          <LogOut size={17} />
                          Sign Out
                        </button>

                      </motion.div>
                    )}

                  </AnimatePresence>

                </div>

              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition">
                    Sign In
                  </button>
                </Link>

                <Link to="/signup">
                  <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
                    Get Started
                  </button>
                </Link>
              </>
            )}

          </div>

          {/* Mobile Menu Button */}

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setDrawer(!drawer)}
          >
            {drawer ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>

      </header>
            <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 24,
              }}
              className="fixed top-0 right-0 w-72 h-screen bg-white shadow-2xl z-50 md:hidden flex flex-col"
            >
              {/* Header */}

              <div className="flex items-center justify-between p-5 border-b">

                <h2 className="font-bold text-lg">
                  HomeHive
                  <span className="text-green-600"> AI</span>
                </h2>

                <button onClick={() => setDrawer(false)}>
                  <X size={22} />
                </button>

              </div>

              {/* Links */}

              <div className="flex-1 p-5 space-y-2">

                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setDrawer(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition"
                  >
                    {item.icon && <item.icon size={18} />}
                    {item.label}
                  </Link>
                ))}

                {isAuth && (
                  <>
                    <hr className="my-3" />

                    <DropdownItem
                      href="/dashboard"
                      Icon={LayoutDashboard}
                      label="Dashboard"
                      onClick={() => setDrawer(false)}
                    />

                    <DropdownItem
                      href="/profile"
                      Icon={User}
                      label="Profile"
                      onClick={() => setDrawer(false)}
                    />

                    

                    <DropdownItem
                      href="/notifications"
                      Icon={Bell}
                      label="Notifications"
                      onClick={() => setDrawer(false)}
                    />
                  </>
                )}

              </div>

              {/* Footer */}

              <div className="border-t p-5">

                {isAuth ? (

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <Avatar
                        initials={
                          user?.email
                            ?.substring(0, 2)
                            .toUpperCase() || "U"
                        }
                        size="sm"
                      />

                      <div>

                        <p className="font-semibold">
                          {user?.user_metadata?.full_name || "User"}
                        </p>

                        <p className="text-xs text-gray-500">
                          {user?.email}
                        </p>

                      </div>

                    </div>

                    <button
                      onClick={logout}
                      className="text-red-500"
                    >
                      <LogOut size={18} />
                    </button>

                  </div>

                ) : (

                  <div className="space-y-3">

                    <Link
                      to="/login"
                      onClick={() => setDrawer(false)}
                    >
                      <button className="w-full py-2 border rounded-lg hover:bg-gray-100 transition">
                        Sign In
                      </button>
                    </Link>

                    <Link
                      to="/signup"
                      onClick={() => setDrawer(false)}
                    >
                      <button className="w-full py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
                        Get Started
                      </button>
                    </Link>

                  </div>

                )}

              </div>

            </motion.div>

          </>
        )}
      </AnimatePresence>
          </>
  );
}

/* ---------------- Avatar ---------------- */

function Avatar({ initials, size = "md" }) {
  const sizeMap = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <div
      className={`${sizeMap[size]} rounded-full flex items-center justify-center font-bold text-white shrink-0`}
      style={{
        background:
          "linear-gradient(135deg,#2E8B3C,#4ab55e)",
      }}
    >
      {initials}
    </div>
  );
}

/* ---------------- Dropdown Item ---------------- */

function DropdownItem({
  href,
  Icon,
  label,
  onClick,
}) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
    >
      <Icon
        size={17}
        className="text-gray-500"
      />

      <span>{label}</span>
    </Link>
  );
}