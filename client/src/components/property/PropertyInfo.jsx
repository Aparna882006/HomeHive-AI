import {
  Star,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Calendar,
  Heart,
  Share2,
} from "lucide-react";

export default function PropertyInfo({ property }) {
  return (
    <section className="mb-10 border-b pb-8">

      <div className="flex justify-between items-start">

        <div>

          <h1 className="text-4xl font-bold text-gray-900">
            {property.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 mt-4 text-gray-600">

            <span className="flex items-center gap-1">
              <Star size={18} className="fill-yellow-400 text-yellow-400" />
              {property.rating}
            </span>

            <span className="flex items-center gap-1">
              <MapPin size={18} />
              {property.location}
            </span>

          </div>

        </div>

        <div className="flex gap-3">

          <button className="border rounded-xl p-3 hover:bg-gray-100">
            <Heart size={20} />
          </button>

          <button className="border rounded-xl p-3 hover:bg-gray-100">
            <Share2 size={20} />
          </button>

        </div>

      </div>

      <div className="grid md:grid-cols-4 gap-6 mt-8">

        <InfoCard icon={<BedDouble />} value={property.bedrooms} label="Bedrooms" />

        <InfoCard icon={<Bath />} value={property.bathrooms} label="Bathrooms" />

        <InfoCard icon={<Ruler />} value={`${property.area} sqft`} label="Area" />

        <InfoCard
          icon={<Calendar />}
          value={property.availableFrom}
          label="Available"
        />

      </div>

      <div className="mt-8">

        <h2 className="text-3xl font-bold text-green-600">
          ₹{property.price.toLocaleString()}
          <span className="text-lg text-gray-500"> / month</span>
        </h2>

      </div>

    </section>
  );
}

function InfoCard({ icon, value, label }) {
  return (
    <div className="border rounded-2xl p-5 bg-white shadow-sm">

      <div className="text-green-600">{icon}</div>

      <h3 className="font-bold text-xl mt-3">{value}</h3>

      <p className="text-gray-500">{label}</p>

    </div>
  );
}