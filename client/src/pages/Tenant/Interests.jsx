import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

export default function Interests() {

  const { user } = useAuth();

  const [interests, setInterests] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {

    const { data } = await supabase
      .from("interests")
      .select("*")
      .eq("tenant_id", user.id)
      .order("created_at", { ascending: false });

    setInterests(data || []);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">

      <h1 className="text-4xl font-bold mb-8">
        My Interest Requests
      </h1>

      <div className="space-y-5">

        {interests.map((i) => (

          <div
            key={i.id}
            className="bg-white rounded-2xl shadow p-6"
          >

            <h2 className="text-xl font-bold">
              Property ID : {i.property_id}
            </h2>

            <p className="mt-2">
              Status :
              <span className="font-semibold ml-2">
                {i.status}
              </span>
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}