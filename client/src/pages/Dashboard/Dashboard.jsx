import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../context/FavoriteContext";

export default function Dashboard() {
  const { user } = useAuth();
  const { favorites } = useFavorites();

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [latestFavorite, setLatestFavorite] = useState(null);
  const [recommendedProperty, setRecommendedProperty] = useState(null);

  useEffect(() => {
    if (user) {
      getProfile();
      loadLatestFavorite();
      loadRecommendation();
    }
  }, [user, favorites]);

  async function getProfile() {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setProfile(data);
    }
  }

  async function loadLatestFavorite() {
    if (favorites.length === 0) {
      setLatestFavorite(null);
      return;
    }

    const latestId = favorites[favorites.length - 1];

    const { data } = await supabase
      .from("properties")
      .select("id,title,location,price")
      .eq("id", latestId)
      .single();

    if (data) {
      setLatestFavorite(data);
    }
  }

  async function loadRecommendation() {
    const { data } = await supabase
      .from("properties")
      .select("id,title,location,price")
      .limit(1)
      .single();

    if (data) {
      setRecommendedProperty(data);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf7f2] to-green-50 py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Welcome Banner */}

        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-8 text-white shadow-xl mb-10">

          <h1 className="text-4xl font-bold">
            👋 Welcome Back, {profile?.full_name?.split(" ")[0] || "User"}
          </h1>

          <p className="mt-3 text-green-100 text-lg">
            Manage your profile, saved rooms and interests from one dashboard.
          </p>

          <button
            onClick={() => navigate("/explore")}
            className="mt-6 bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Browse Properties →
          </button>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Profile Card */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="w-28 h-28 rounded-full bg-green-600 text-white flex items-center justify-center text-5xl font-bold mx-auto">

              {profile?.full_name?.charAt(0)}

            </div>

            <h2 className="text-3xl font-bold text-center mt-5">
              {profile?.full_name}
            </h2>

            <p className="text-center text-gray-500 mt-2">
              {profile?.email}
            </p>

            <p className="text-center mt-2">
              📞 {profile?.phone || "Not Added"}
            </p>

            <p className="text-center mt-2">
              👤 {profile?.role}
            </p>

            <button
              onClick={() => navigate("/profile")}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
            >
              Edit Profile
            </button>

            <button
              onClick={logout}
              className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
            >
              Logout
            </button>

          </div>

          {/* Right Section */}

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                    {/* Latest Saved Property */}

            <div
              onClick={() => navigate("/explore")}
              className="bg-white rounded-3xl shadow-xl p-8 cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl">❤️</div>

              <h2 className="text-xl font-bold mt-4">
                Latest Saved Property
              </h2>

              {latestFavorite ? (
                <>
                  <h3 className="mt-5 text-lg font-semibold text-green-700">
                    {latestFavorite.title}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    📍 {latestFavorite.location}
                  </p>

                  <p className="font-semibold mt-2">
                    ₹ {latestFavorite.price}/month
                  </p>
                </>
              ) : (
                <p className="mt-5 text-gray-500">
                  No saved properties yet.
                </p>
              )}

              <p className="mt-6 text-green-600 font-semibold">
                Browse Properties →
              </p>
            </div>

            {/* Browse Rooms */}

            <div
              onClick={() => navigate("/explore")}
              className="bg-white rounded-3xl shadow-xl p-8 cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl">🏠</div>

              <h2 className="text-xl font-bold mt-4">
                Browse Rooms
              </h2>

              <p className="text-gray-500 mt-5">
                Discover new PGs, Flats and Rooms near your preferred location.
              </p>

              <button className="mt-6 bg-green-600 text-white px-5 py-2 rounded-xl">
                Explore →
              </button>
            </div>

            {/* My Interests */}

            <div
              onClick={() => navigate("/explore")}
              className="bg-white rounded-3xl shadow-xl p-8 cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl">🤝</div>

              <h2 className="text-xl font-bold mt-4">
                My Interests
              </h2>

              <p className="text-gray-500 mt-5">
                Track the properties you've shown interest in.
              </p>

              <p className="text-4xl font-bold text-green-600 mt-4">
                {favorites.length}
              </p>

              <p className="mt-6 text-green-600 font-semibold">
                View Interests →
              </p>
            </div>

            {/* AI Recommendation */}

            <div
              onClick={() => navigate("/explore")}
              className="bg-white rounded-3xl shadow-xl p-8 cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl">✨</div>

              <h2 className="text-xl font-bold mt-4">
                AI Recommendation
              </h2>

              {recommendedProperty ? (
                <>
                  <h3 className="mt-5 text-lg font-semibold text-green-700">
                    {recommendedProperty.title}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    📍 {recommendedProperty.location}
                  </p>

                  <p className="font-semibold mt-2">
                    ₹ {recommendedProperty.price}/month
                  </p>
                </>
              ) : (
                <p className="mt-5 text-gray-500">
                  No recommendation available.
                </p>
              )}

              <p className="mt-6 text-green-600 font-semibold">
                View Recommendation →
              </p>
            </div>

          </div>

        </div>
              {/* Quick Actions */}

        <div className="mt-12 bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            🚀 Quick Actions
          </h2>

          <div className="grid md:grid-cols-4 gap-5">

            <button
              onClick={() => navigate("/explore")}
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 font-semibold transition"
            >
              Browse Rooms
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 font-semibold transition"
            >
              My Profile
            </button>

            <button
              onClick={() => navigate("/explore")}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-4 font-semibold transition"
            >
              Saved Properties
            </button>

            <button
              onClick={() => navigate("/notifications")}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-4 font-semibold transition"
            >
              Notifications
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}