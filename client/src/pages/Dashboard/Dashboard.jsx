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

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  async function getProfile() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!error) {
      setProfile(data);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] py-12">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Profile Card */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <div className="w-24 h-24 rounded-full bg-green-600 text-white flex items-center justify-center text-4xl font-bold mx-auto">
              {profile?.full_name?.charAt(0)}
            </div>

            <h2 className="text-2xl font-bold text-center mt-5">
              {profile?.full_name}
            </h2>

            <p className="text-center text-gray-500 mt-2">
              {profile?.email}
            </p>

            <p className="text-center mt-2">
              📞 {profile?.phone}
            </p>

            <p className="text-center mt-2">
              Role : {profile?.role}
            </p>

            <button
              onClick={logout}
              className="w-full mt-8 bg-red-500 text-white py-3 rounded-xl"
            >
              Logout
            </button>

          </div>

          {/* Statistics */}

          <div className="md:col-span-2 grid grid-cols-2 gap-6">

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-lg font-semibold">
                Saved Properties
              </h2>

               <p className="text-5xl mt-6 font-bold text-green-600">
                    {favorites.length}
                </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-lg font-semibold">
                Scheduled Visits
              </h2>

              <p className="text-5xl mt-6 font-bold text-green-600">
                0
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-lg font-semibold">
                Messages
              </h2>

              <p className="text-5xl mt-6 font-bold text-green-600">
                0
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-lg font-semibold">
                AI Matches
              </h2>

              <p className="text-5xl mt-6 font-bold text-green-600">
                0
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}