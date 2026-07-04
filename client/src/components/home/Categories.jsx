const categories = [
  "All",
  "AI Matched",
  "Students",
  "Women Only",
  "Pet Friendly",
  "Work From Home",
  "Luxury Rooms",
  "Budget Stays",
  "Shared Flats",
  "Private Rooms",
  "Near Metro",
  "Fully Furnished",
  "Couple Friendly",
  "Verified Owners",
  "High Compatibility",
  "Co-Living",
  "Weekend Rentals",
];

export default function Categories({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <section className="py-8 bg-white border-b sticky top-20 z-30">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#1f2937]">
            Browse by lifestyle
          </h2>

          <button
            onClick={() => setSelectedCategory("All")}
            className="text-green-600 font-semibold hover:underline"
          >
            View All
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">

          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`flex-shrink-0 px-6 py-3 rounded-2xl transition-all duration-300 font-medium border
              ${
                selectedCategory === item
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-[#f8f5ef] text-gray-700 hover:bg-green-600 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}

        </div>
      </div>
    </section>
  );
}