import { Heart, Share2, Star, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../../context/FavoriteContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function PropertyCard({ item }) {
  const { user } = useAuth();

  const navigate = useNavigate();

  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavorite = async (e) => {
  e.preventDefault();

  if (!user) {
    toast.error("Please login first");
    navigate("/login");
    return;
  }

  const added = await toggleFavorite(item.id);

  if (added) {
    toast.success("Added to Favorites ❤️");
  } else {
    toast.success("Removed from Favorites");
  }
};

  const handleShare = async (e) => {
    e.preventDefault();

    const url = `${window.location.origin}/property/${item.id}`;

    try {
      await navigator.clipboard.writeText(url);
      toast.success("Property link copied!");
    } catch {
      toast.error("Unable to copy link.");
    }
  };

  return (
    <Link to={`/property/${item.id}`}>
      <div className="bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-2xl transition duration-300 cursor-pointer group">

        {/* IMAGE */}

        <div className="relative overflow-hidden">

          <img
            src={item.image || item.images?.[0]}
            alt={item.title}
            className="w-full h-[280px] object-cover group-hover:scale-105 transition duration-500"
          />

          {/* Favorite */}

          <button
            onClick={handleFavorite}
            className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md"
          >
            <Heart
                    size={18}
                    className={
                         isFavorite(item.id)
                            ? "text-red-500 fill-red-500"
                             : ""
                    }
/>    
          </button>

          {/* Share */}

          <button
            onClick={handleShare}
            className="absolute top-16 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md"
          >
            <Share2 size={18} />
          </button>

        </div>

        {/* CONTENT */}

        <div className="p-5">

          <div className="flex justify-between items-center">

            <h3 className="font-bold text-xl">
              {item.title}
            </h3>

            <div className="flex items-center gap-1">

              <Star
                size={16}
                fill="#FFD700"
                className="text-yellow-400"
              />

              <span>{item.rating}</span>

            </div>

          </div>

          <div className="flex items-center gap-2 text-gray-500 mt-3">

            <MapPin size={16} />

            {item.location}

          </div>

          <div className="mt-4">

            <span className="font-bold text-2xl">
              ₹{item.price}
            </span>

            <span className="text-gray-500">
              /month
            </span>

          </div>

        </div>

      </div>
    </Link>
  );
}