import { Sparkles } from "lucide-react";

export default function AIMatchBanner() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-[40px] p-14 text-white flex flex-col lg:flex-row items-center justify-between gap-10">

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles />
              <span className="font-semibold">
                AI Recommendation
              </span>
            </div>

            <h2 className="text-5xl font-bold leading-tight">
              Find compatible
              <br />
              flatmates instantly
            </h2>

            <p className="mt-6 text-lg text-green-100 max-w-xl">
              Smart AI matching based on personality,
              budget and lifestyle habits.
            </p>
          </div>

          <button className="bg-white text-green-600 px-8 py-4 rounded-2xl font-bold text-lg">
            Try AI Match
          </button>
        </div>
      </div>
    </section>
  );
}