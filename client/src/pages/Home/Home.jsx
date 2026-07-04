import { useState } from "react";
import Categories from "../../components/home/Categories";
import Listings from "../../components/home/Listings";
import AIMatchBanner from "../../components/home/AIMatchBanner";

import { Search } from "lucide-react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="bg-[#faf7f2] min-h-screen">

      {/* HERO */}
      <section className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                AI Powered Flatmate Finder
              </span>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mt-6 text-[#1f2937]">
                Find Your
                <span className="text-green-600">
                  {" "}Perfect Stay
                </span>
              </h1>

              <p className="text-gray-600 text-lg mt-6 max-w-xl leading-relaxed">
                Discover verified rooms, apartments and compatible flatmates using AI.
              </p>

              <div className="bg-white rounded-2xl shadow-xl p-4 mt-10 flex flex-col md:flex-row gap-4">

                <input
                  type="text"
                  placeholder="Location"
                  className="flex-1 border rounded-xl px-4 py-3 outline-none"
                />

                <input
                  type="text"
                  placeholder="Budget"
                  className="flex-1 border rounded-xl px-4 py-3 outline-none"
                />

                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                  <Search size={18} />
                  Search
                </button>

              </div>

            </div>

            {/* RIGHT */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
                alt="room"
                className="rounded-[40px] shadow-2xl w-full h-[500px] object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Listings
        selectedCategory={selectedCategory}
      />

      <AIMatchBanner />

    </div>
  );
}