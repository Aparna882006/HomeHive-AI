import {
  Sparkles,
  CheckCircle2,
  XCircle
} from "lucide-react";

const matchData = {
  score: 94,

  positives: [
    "Fits within your budget",
    "Preferred location",
    "Pet Friendly",
    "Vegetarian Flatmates",
    "High-speed WiFi",
    "Work From Home Friendly",
  ],

  negatives: [
    "No Parking",
    "No Gym"
  ]
};

export default function AICompatibility() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex items-center gap-3 mb-8">

        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
          <Sparkles className="text-green-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            AI Compatibility
          </h2>

          <p className="text-gray-500">
            Personalized recommendation for you
          </p>
        </div>

      </div>

      <div className="flex items-center gap-8 mb-8">

        <div className="w-28 h-28 rounded-full border-[10px] border-green-500 flex items-center justify-center">

          <div className="text-center">

            <div className="text-4xl font-bold text-green-600">
              {matchData.score}%
            </div>

            <div className="text-sm text-gray-500">
              Match
            </div>

          </div>

        </div>

        <div className="flex-1">

          <h3 className="font-bold text-xl mb-3">
            Why this property matches you
          </h3>

          <p className="text-gray-600 leading-7">
            Our AI analyzed your preferred location,
            budget, lifestyle, food habits, work schedule,
            cleanliness, and roommate preferences.
            This property has an excellent compatibility score.
          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-8">

        <div>

          <h3 className="font-semibold text-lg mb-4">
            Perfect Matches
          </h3>

          <div className="space-y-3">

            {matchData.positives.map((item) => (

              <div
                key={item}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="text-green-600" size={20} />

                <span>{item}</span>

              </div>

            ))}

          </div>

        </div>

        <div>

          <h3 className="font-semibold text-lg mb-4">
            Missing Features
          </h3>

          <div className="space-y-3">

            {matchData.negatives.map((item) => (

              <div
                key={item}
                className="flex items-center gap-3"
              >
                <XCircle className="text-red-500" size={20} />

                <span>{item}</span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}