import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

export default function OwnerDashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    filled: 0,
    interests: 0,
    pending: 0,
    accepted: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  async function loadStats() {
    setLoading(true);

    // Fetch owner's properties
    const { data: properties, error } = await supabase
      .from("properties")
      .select("id,is_filled")
      .eq("owner_id", user.id);

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    const total = properties.length;
    const filled = properties.filter((p) => p.is_filled).length;
    const available = total - filled;

    let interests = 0;
    let pending = 0;
    let accepted = 0;

    if (properties.length > 0) {
      const propertyIds = properties.map((p) => p.id);

      const { data: requests } = await supabase
        .from("interests")
        .select("status")
        .in("property_id", propertyIds);

      if (requests) {
        interests = requests.length;
        pending = requests.filter(
          (r) => r.status === "Pending"
        ).length;

        accepted = requests.filter(
          (r) => r.status === "Accepted"
        ).length;
      }
    }

    setStats({
      total,
      available,
      filled,
      interests,
      pending,
      accepted,
    });

    setLoading(false);
  }

  const cards = [
    {
      title: "My Listings",
      value: stats.total,
      color: "bg-blue-500",
      link: "/owner/my-listings",
      icon: "🏠",
    },
    {
      title: "Available",
      value: stats.available,
      color: "bg-green-500",
      link: "/owner/my-listings",
      icon: "✅",
    },
    {
      title: "Filled",
      value: stats.filled,
      color: "bg-orange-500",
      link: "/owner/my-listings",
      icon: "🚪",
    },
    {
      title: "Interest Requests",
      value: stats.interests,
      color: "bg-purple-500",
      link: "/owner/interested-tenants",
      icon: "👥",
    },
    {
      title: "Pending",
      value: stats.pending,
      color: "bg-yellow-500",
      link: "/owner/interested-tenants",
      icon: "⏳",
    },
    {
      title: "Accepted",
      value: stats.accepted,
      color: "bg-emerald-600",
      link: "/owner/interested-tenants",
      icon: "🎉",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf7f2] p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold">
              Owner Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your properties, tenants and requests.
            </p>

          </div>

          <Link
            to="/owner/add"
            className="mt-5 md:mt-0 bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-xl shadow"
          >
            + Add Property
          </Link>

        </div>

        {/* Stats */}

        {loading ? (

          <div className="text-center py-20 text-xl">
            Loading Dashboard...
          </div>

        ) : (

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

            {cards.map((card, index) => (

              <Link
                key={index}
                to={card.link}
                className={`${card.color} rounded-3xl text-white p-6 shadow-lg hover:scale-105 transition`}
              >

                <div className="text-4xl">
                  {card.icon}
                </div>

                <h2 className="mt-4 text-lg font-medium">
                  {card.title}
                </h2>

                <div className="text-5xl font-bold mt-4">
                  {card.value}
                </div>

              </Link>

            ))}

          </div>

        )}

        {/* Quick Actions */}

        <div className="grid md:grid-cols-3 gap-6 mt-12">

          <Link
            to="/owner/add"
            className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition"
          >
            <div className="text-5xl mb-5">
              ➕
            </div>

            <h2 className="text-2xl font-bold">
              Add Property
            </h2>

            <p className="text-gray-500 mt-3">
              Post a new room, flat or PG listing.
            </p>

          </Link>

          <Link
            to="/owner/my-listings"
            className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition"
          >
            <div className="text-5xl mb-5">
              🏠
            </div>

            <h2 className="text-2xl font-bold">
              My Listings
            </h2>

            <p className="text-gray-500 mt-3">
              Edit, delete and mark listings as filled.
            </p>

          </Link>

          <Link
            to="/owner/interested-tenants"
            className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition"
          >
            <div className="text-5xl mb-5">
              👥
            </div>

            <h2 className="text-2xl font-bold">
              Interested Tenants
            </h2>

            <p className="text-gray-500 mt-3">
              Accept or reject tenant requests.
            </p>

          </Link>

        </div>

      </div>

    </div>
  );
}