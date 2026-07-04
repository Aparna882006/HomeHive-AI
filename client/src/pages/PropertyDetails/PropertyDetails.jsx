import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";

import Gallery from "../../components/property/Gallery";
import PropertyInfo from "../../components/property/PropertyInfo";
import BookingCard from "../../components/property/BookingCard";
import SimilarProperties from "../../components/property/SimilarProperties";

export default function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  async function fetchProperty() {
    setLoading(true);

    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", Number(id))
      .single();

    if (error) {
      console.error(error);
      setProperty(null);
    } else {
      setProperty(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="pt-40 text-center text-2xl">
        Loading Property...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-40 text-center text-2xl">
        Property Not Found
      </div>
    );
  }

  return (
    <div className="bg-[#faf7f2] min-h-screen pt-28 pb-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* GALLERY */}
        <Gallery
          images={[
            property.image,
            property.image2,
            property.image3,
          ].filter(Boolean)}
        />

        {/* MAIN CONTENT */}
        <div className="flex flex-col lg:flex-row gap-8 mt-10 items-start">

          {/* LEFT SECTION */}
          <div className="flex-1 min-w-0">

            <div className="space-y-8">

              <PropertyInfo property={property} />

              <SimilarProperties />

            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-full lg:w-[420px] shrink-0">

            <div className="sticky top-28">

              <BookingCard property={property} />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}