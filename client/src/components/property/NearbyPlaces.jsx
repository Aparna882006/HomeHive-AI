import {
  MapPin,
  School,
  ShoppingBag,
  Train,
  Hospital,
} from "lucide-react";

const places = [
  {
    icon: School,
    name: "University",
    distance: "700 m",
  },
  {
    icon: ShoppingBag,
    name: "Mall",
    distance: "500 m",
  },
  {
    icon: Train,
    name: "Metro Station",
    distance: "300 m",
  },
  {
    icon: Hospital,
    name: "Hospital",
    distance: "1.1 km",
  },
];

export default function NearbyPlaces() {
  return (
    <section className="mt-14">

      <h2 className="text-3xl font-bold mb-8">
        Nearby Places
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        {places.map((place) => {

          const Icon = place.icon;

          return (

            <div
              key={place.name}
              className="bg-white rounded-2xl shadow p-5 flex justify-between items-center"
            >

              <div className="flex gap-4 items-center">

                <Icon
                  className="text-green-600"
                  size={30}
                />

                <div>

                  <h3 className="font-semibold">
                    {place.name}
                  </h3>

                  <p className="text-gray-500">
                    Walking Distance
                  </p>

                </div>

              </div>

              <span className="font-bold">
                {place.distance}
              </span>

            </div>

          );

        })}

      </div>

    </section>
  );
}