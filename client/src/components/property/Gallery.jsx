import { useState } from "react";
import { Image, X } from "lucide-react";

export default function Gallery({ images }) {
  const [open, setOpen] = useState(false);

  if (!images || images.length === 0) return null;

  return (
    <>
      <section className="mb-10">

        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-4 gap-3 h-[520px] rounded-3xl overflow-hidden">

          <div className="col-span-2 row-span-2 overflow-hidden">
            <img
              src={images[0]}
              alt=""
              onClick={() => setOpen(true)}
              className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer"
            />
          </div>

          {images.slice(1, 5).map((img, index) => (
            <div
              key={index}
              className="overflow-hidden"
            >
              <img
                src={img}
                alt=""
                onClick={() => setOpen(true)}
                className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer"
              />
            </div>
          ))}

        </div>

        {/* Mobile */}

        <div className="lg:hidden rounded-3xl overflow-hidden">
          <img
            src={images[0]}
            alt=""
            onClick={() => setOpen(true)}
            className="w-full h-[280px] object-cover cursor-pointer"
          />
        </div>

        <div className="flex justify-end mt-4">

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 border rounded-xl px-5 py-3 hover:bg-gray-100 transition"
          >
            <Image size={18} />
            Show all photos
          </button>

        </div>

      </section>

      {/* Full Screen Gallery */}

      {open && (
        <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">

          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 bg-white rounded-full p-2"
          >
            <X size={24} />
          </button>

          <div className="max-w-6xl mx-auto py-16 px-6 grid gap-6">

            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className="w-full rounded-2xl"
              />
            ))}

          </div>

        </div>
      )}
    </>
  );
}