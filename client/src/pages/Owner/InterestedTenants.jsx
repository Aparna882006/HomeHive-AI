import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function InterestedTenants() {
  const { user } = useAuth();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchRequests();
  }, [user]);

  async function fetchRequests() {
    setLoading(true);

    const { data: properties, error: propError } = await supabase
      .from("properties")
      .select("id,title")
      .eq("owner_id", user.id);

    if (propError) {
      console.log(propError);
      setLoading(false);
      return;
    }

    if (!properties || properties.length === 0) {
      setRequests([]);
      setLoading(false);
      return;
    }

    const propertyIds = properties.map((p) => p.id);

    const { data: interests, error } = await supabase
      .from("interests")
      .select("*")
      .in("property_id", propertyIds)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    const result = await Promise.all(
      interests.map(async (interest) => {
        const property = properties.find(
          (p) => p.id === interest.property_id
        );

        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", interest.tenant_id)
          .single();

        return {
          ...interest,
          property,
          profile,
        };
      })
    );

    setRequests(result);
    setLoading(false);
  }

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from("interests")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update");
      return;
    }

    toast.success(`Request ${status}`);
    fetchRequests();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] p-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              Interested Tenants
            </h1>

            <p className="text-gray-500 mt-2">
              {requests.length} Requests
            </p>
          </div>

          <Link
            to="/owner"
            className="bg-green-600 text-white px-5 py-3 rounded-xl"
          >
            Back
          </Link>
        </div>

        {/* Empty */}
        {requests.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl shadow text-center">
            <h2 className="text-3xl font-bold">
              No Interest Yet
            </h2>

            <p className="text-gray-500 mt-4">
              Waiting for tenants to send requests.
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {requests.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-3xl shadow p-8"
              >

                {/* Top */}
                <div className="flex justify-between">

                  <div>
                    <h2 className="text-3xl font-bold">
                      {r.profile?.full_name || "Unknown Tenant"}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      📧 {r.profile?.email}
                    </p>

                    <p className="text-gray-500">
                      📱 {r.profile?.phone}
                    </p>
                  </div>

                  <div className="text-right">
                    <h2 className="text-2xl font-bold text-green-600">
                      {r.property?.title}
                    </h2>

                    <p className="mt-2">
                      {new Date(r.created_at).toLocaleDateString()}
                    </p>

                    <span
                      className={`inline-block mt-3 px-4 py-1 rounded-full font-semibold ${
                        r.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : r.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>

                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">

                  {/* AI */}
                  <div className="bg-purple-50 rounded-xl p-5">

                    <p className="text-gray-500 text-sm">
                      AI Compatibility
                    </p>

                    {r.compatibility_score ? (
                      <>
                        <h2 className="text-4xl font-bold text-purple-700 mt-3">
                          {r.compatibility_score}%
                        </h2>

                        <p className="text-gray-600 mt-3">
                          {r.compatibility_explanation}
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold text-gray-700 mt-3">
                          Request Received
                        </h2>

                        <p className="text-gray-500 mt-3">
                          AI compatibility has not been generated yet.
                        </p>
                      </>
                    )}

                  </div>

                  {/* Date */}
                  <div className="bg-green-50 rounded-xl p-5">

                    <p className="text-gray-500 text-sm">
                      Request Date
                    </p>

                    <h2 className="text-3xl font-bold mt-3">
                      {new Date(r.created_at).toLocaleDateString()}
                    </h2>

                  </div>

                </div>

                {/* Buttons */}
                <div className="mt-8 flex gap-4">

                  {r.status === "Pending" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(r.id, "Accepted")
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(r.id, "Rejected")
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {r.status === "Accepted" && (
                    <Link
                      to={`/chat/${r.property_id}/${r.tenant_id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                    >
                      💬 Chat with Tenant
                    </Link>
                  )}

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}