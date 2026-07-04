import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function MyListings() {
  const { user } = useAuth();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProperties();
    }
  }, [user]);

  async function fetchProperties() {
    setLoading(true);

    // Fetch owner properties
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    // Count interests for every property
    const result = await Promise.all(
      data.map(async (property) => {
        const { count } = await supabase
          .from("interests")
          .select("*", { count: "exact", head: true })
          .eq("property_id", property.id);

        return {
          ...property,
          interestCount: count || 0,
        };
      })
    );

    setProperties(result);
    setLoading(false);
  }

  async function deleteProperty(id) {
    if (!window.confirm("Delete this property permanently?")) return;

    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Property Deleted");
    fetchProperties();
  }

  async function toggleFilled(property) {
    const { error } = await supabase
      .from("properties")
      .update({
        is_filled: !property.is_filled,
      })
      .eq("id", property.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Property Updated");
    fetchProperties();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] p-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold">
              My Listings
            </h1>

            <p className="text-gray-500 mt-2">
              {properties.length} Properties Listed
            </p>

          </div>

          <Link
            to="/owner/add"
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
          >
            + Add Property
          </Link>

        </div>

        {properties.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

            <h2 className="text-3xl font-bold">
              No Properties Added
            </h2>

            <p className="text-gray-500 mt-3">
              Add your first property.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {properties.map((property) => (

              <div
                key={property.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition"
              >

                <img
                  src={
                    property.image ||
                    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200"
                  }
                  className="w-full h-52 object-cover"
                  alt=""
                />

                <div className="p-6">

                  <div className="flex justify-between items-start">

                    <div>

                      <h2 className="text-2xl font-bold">
                        {property.title}
                      </h2>

                      <p className="text-gray-500">
                        {property.location}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        property.is_filled
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {property.is_filled
                        ? "Filled"
                        : "Available"}
                    </span>

                  </div>

                  <h3 className="text-3xl font-bold text-green-600 mt-5">
                    ₹{property.price}
                    <span className="text-lg text-gray-500">
                      /month
                    </span>
                  </h3>

                  {/* Property Info */}

                  <div className="mt-5 space-y-2 text-gray-600">

                    <p>
                      🛏 {property.room_type}
                    </p>

                    <p>
                      🪑 {property.furnishing}
                    </p>

                    <p>
                      📅 {property.available_from}
                    </p>

                    <p className="font-semibold text-purple-600">
                      👥 {property.interestCount} Interested Tenant(s)
                    </p>

                  </div>

                  {/* Buttons */}

                  <div className="grid grid-cols-2 gap-3 mt-6">

                    <Link
                      to={`/property/${property.id}`}
                      className="bg-blue-600 text-white text-center py-3 rounded-xl hover:bg-blue-700"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => toggleFilled(property)}
                      className="bg-yellow-500 text-white rounded-xl hover:bg-yellow-600"
                    >
                      {property.is_filled
                        ? "Available"
                        : "Filled"}
                    </button>

                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-3">

                    <Link
                      to={`/owner/interested-tenants`}
                      className="bg-purple-600 text-white text-center py-3 rounded-xl hover:bg-purple-700"
                    >
                      Interests
                    </Link>

                    <button
                      onClick={() => deleteProperty(property.id)}
                      className="bg-red-600 text-white rounded-xl hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}