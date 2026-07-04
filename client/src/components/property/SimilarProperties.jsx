import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import PropertyCard from "../home/PropertyCard";

export default function SimilarProperties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties();
  }, []);

  async function getProperties() {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .limit(3);

    if (error) {
      console.log(error);
    } else {
      setProperties(data);
    }
  }

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-8">
        Similar Properties
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((item) => (
          <PropertyCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}