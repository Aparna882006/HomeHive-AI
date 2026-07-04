import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import PropertyCard from "./PropertyCard";

export default function Listings({ selectedCategory }) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
  const { data, error } = await supabase
    .from("properties")
    .select("*");

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    console.error("Supabase Error:", error);
    return;
  }

  setListings(data || []);
}

  const filteredListings = listings.filter((item) => {
    if (selectedCategory === "All") return true;

    switch (selectedCategory) {
      case "Luxury Rooms":
        return item.price >= 30000;

      case "Budget Stays":
        return item.price <= 15000;

      case "Students":
        return item.property_type === "PG";

      case "Women Only":
        return item.gender === "Female";

      case "Pet Friendly":
        return item.description?.toLowerCase().includes("pet");

      case "Work From Home":
        return item.description?.toLowerCase().includes("workspace");

      case "Shared Flats":
        return item.property_type === "Shared Flat";

      case "Private Rooms":
        return item.property_type === "Private Room";

      case "Fully Furnished":
        return item.furnished === "Fully Furnished";

      case "Couple Friendly":
        return item.gender === "Couples";

      case "Verified Owners":
        return item.description?.toLowerCase().includes("verified");

      case "Near Metro":
        return item.description?.toLowerCase().includes("metro");

      case "Co-Living":
        return item.property_type === "Co-Living";

      case "Weekend Rentals":
        return item.description?.toLowerCase().includes("weekend");

      case "AI Matched":
        return item.rating >= 4.8;

      case "High Compatibility":
        return item.rating >= 4.9;

      default:
        return true;
    }
  });

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold text-[#1f2937]">
            {selectedCategory === "All"
              ? "Popular Stays"
              : selectedCategory}
          </h2>

          <button
            onClick={() => window.location.reload()}
            className="text-green-600 font-semibold"
          >
            View All
          </button>
        </div>

        {filteredListings.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-xl">
            No properties found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredListings.map((item) => (
              <PropertyCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}