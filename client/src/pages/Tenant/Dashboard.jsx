import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        Tenant Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <Link
          to="/explore"
          className="bg-white p-8 rounded-2xl shadow hover:shadow-lg"
        >
          <h2 className="text-2xl font-bold">
            Browse Rooms
          </h2>

          <p className="text-gray-500 mt-2">
            Search available listings.
          </p>
        </Link>

        <Link
          to="/tenant/interests"
          className="bg-white p-8 rounded-2xl shadow hover:shadow-lg"
        >
          <h2 className="text-2xl font-bold">
            My Interests
          </h2>

          <p className="text-gray-500 mt-2">
            View requests sent to owners.
          </p>
        </Link>

        <Link
          to="/tenant/saved"
          className="bg-white p-8 rounded-2xl shadow hover:shadow-lg"
        >
          <h2 className="text-2xl font-bold">
            Saved Listings
          </h2>

          <p className="text-gray-500 mt-2">
            View favourite properties.
          </p>
        </Link>

      </div>

    </div>
  );
}