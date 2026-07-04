import { Link } from "react-router-dom";

export default function SavedListings() {

  return (

    <div className="min-h-screen bg-gray-50 p-10">

      <h1 className="text-4xl font-bold mb-8">
        Saved Listings
      </h1>

      <div className="bg-white rounded-2xl shadow p-12 text-center">

        <h2 className="text-2xl font-bold">
          No Saved Listings
        </h2>

        <p className="text-gray-500 mt-3">
          Save your favourite properties here.
        </p>

        <Link
          to="/explore"
          className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          Browse Properties
        </Link>

      </div>

    </div>

  );
}