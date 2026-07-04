import {
  Wifi,
  Car,
  Dumbbell,
  Shield,
  CookingPot,
  Droplets,
} from "lucide-react";

const icons = {
  WiFi: Wifi,
  Parking: Car,
  Gym: Dumbbell,
  Security: Shield,
  Kitchen: CookingPot,
  Laundry: Droplets,
};

export default function Amenities({ amenities = [] }) {
  if (amenities.length === 0) {
    return (
      <section className="py-10 border-b">
        <h2 className="text-3xl font-bold mb-8">
          What this place offers
        </h2>

        <div className="bg-white rounded-2xl p-6 shadow-sm text-gray-500">
          Amenities information is not available for this property.
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 border-b">
      <h2 className="text-3xl font-bold mb-8">
        What this place offers
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {amenities.map((item) => {
          const Icon = icons[item] || Wifi;

          return (
            <div
              key={item}
              className="flex items-center gap-4 border rounded-xl p-4 hover:shadow-md transition"
            >
              <Icon className="text-green-600" />

              <span className="font-medium">
                {item}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}