import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { supabase } from "../../lib/supabase";
import PropertyCard from "../../components/home/PropertyCard";

export default function Explore() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProperties();
  }, []);

  async function getProperties() {
    const { data, error } = await supabase
      .from("properties")
      .select("*");

    if (error) {
      console.log(error);
    } else {
      setListings(data);
    }

    setLoading(false);
  }

  return (
    <div className="bg-[#faf7f2] min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">

          <div>
            <h1 className="text-5xl font-bold text-[#1f2937]">
              Explore Stays
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Discover verified rooms and apartments
            </p>
          </div>

          {/* Search */}
          <div className="bg-white rounded-2xl shadow-lg p-3 flex items-center gap-3 w-full lg:w-[520px]">

            <Search className="text-gray-400" />

            <input
              type="text"
              placeholder="Search location..."
              className="flex-1 outline-none"
            />

            <button className="bg-green-600 text-white px-5 py-3 rounded-xl">
              Search
            </button>

          </div>

        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-10 overflow-x-auto scrollbar-hide">

          {[
            "Apartments",
            "Studios",
            "Shared",
            "Luxury",
            "Budget",
            "Villa",
          ].map((item) => (
            <button
              key={item}
              className="px-5 py-3 bg-white rounded-2xl shadow-sm border hover:border-green-500 transition whitespace-nowrap"
            >
              {item}
            </button>
          ))}

          <button className="px-5 py-3 bg-white rounded-2xl shadow-sm border flex items-center gap-2">
            <SlidersHorizontal size={18} />
            Filters
          </button>

        </div>

        {/* Listings */}

        {loading ? (
          <h2 className="text-center text-2xl">
            Loading Properties...
          </h2>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {listings.map((item) => (
              <PropertyCard
                key={item.id}
                item={item}
              />
            ))}

          </div>
        )}

      </div>
    </div>
  );
}