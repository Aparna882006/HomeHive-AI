import { Link } from "react-router-dom";

export default function BrowseListings() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">
          Browse Listings
        </h1>

        <div className="bg-white rounded-2xl shadow p-10 text-center">

          <h2 className="text-2xl font-semibold">
            Find Your Perfect Room
          </h2>

          <p className="text-gray-500 mt-3">
            Browse all available room listings with AI compatibility.
          </p>

          <Link
            to="/explore"
            className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-xl"
          >
            Browse Properties
          </Link>

        </div>

      </div>
    </div>
  );
}