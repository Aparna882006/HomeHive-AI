import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    loadUser();
  }, []);

  if (!user) {
    return (
      <div className="p-10 text-center">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <div className="bg-white rounded-3xl shadow-lg p-8">

        <div className="flex items-center gap-5">

          <div className="w-20 h-20 rounded-full bg-green-600 text-white flex items-center justify-center text-3xl font-bold">
            {user.email?.substring(0, 1).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              {user.user_metadata?.full_name || "User"}
            </h1>

            <p className="text-gray-500">
              {user.email}
            </p>
          </div>

        </div>

        <div className="mt-10 grid gap-5">

          <div className="border rounded-xl p-5">
            <h2 className="font-semibold text-gray-600">
              Email
            </h2>

            <p>{user.email}</p>
          </div>

          <div className="border rounded-xl p-5">
            <h2 className="font-semibold text-gray-600">
              User ID
            </h2>

            <p className="break-all">
              {user.id}
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <h2 className="font-semibold text-gray-600">
              Account Created
            </h2>

            <p>
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}