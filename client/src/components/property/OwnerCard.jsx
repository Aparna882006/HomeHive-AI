import { Phone, MessageCircle } from "lucide-react";

export default function OwnerCard({ owner }) {
  return (
    <section className="border rounded-3xl p-8 shadow-md">

      <div className="flex items-center gap-5">

        <img
          src={owner.image}
          alt=""
          className="w-20 h-20 rounded-full object-cover"
        />

        <div>

          <h2 className="text-2xl font-bold">
            {owner.name}
          </h2>

          <p className="text-gray-500">
            Member since {owner.joined}
          </p>

          <p className="text-green-600 mt-2">
            Response Rate {owner.responseRate}
          </p>

        </div>

      </div>

      <div className="flex gap-4 mt-8">

        <button className="flex-1 bg-green-600 text-white py-3 rounded-xl flex justify-center gap-2">
          <Phone />
          Call
        </button>

        <button className="flex-1 border py-3 rounded-xl flex justify-center gap-2">
          <MessageCircle />
          Chat
        </button>

      </div>

    </section>
  );
}