import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function AddProperty() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    room_type: "Private Room",
    furnishing: "Furnished",
    available_from: "",
    image: "",
    description: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("========== ADD PROPERTY ==========");
    console.log("Current User:", user);
    console.log("User ID:", user?.id);

    if (!user) {
      toast.error("User not logged in");
      return;
    }

    const property = {
      owner_id: user.id,
      title: form.title,
      location: form.location,
      price: Number(form.price),
      room_type: form.room_type,
      furnishing: form.furnishing,
      available_from: form.available_from,
      image: form.image,
      description: form.description,
      is_filled: false,
    };

    console.log("Property to insert:", property);

    setLoading(true);

    const { data, error } = await supabase
      .from("properties")
      .insert(property)
      .select();

    setLoading(false);

    console.log("Returned Data:", data);
    console.log("Insert Error:", error);

    if (error) {
      alert(JSON.stringify(error, null, 2));
      toast.error(error.message);
      return;
    }

    toast.success("Property Added Successfully");

    navigate("/owner/my-listings");
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-3xl font-bold mb-8">
          Add New Property
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            name="title"
            placeholder="Property Title"
            className="w-full border p-3 rounded-xl"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            name="location"
            placeholder="Location"
            className="w-full border p-3 rounded-xl"
            value={form.location}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Rent Per Month"
            className="w-full border p-3 rounded-xl"
            value={form.price}
            onChange={handleChange}
            required
          />

          <select
            name="room_type"
            className="w-full border p-3 rounded-xl"
            value={form.room_type}
            onChange={handleChange}
          >
            <option>Private Room</option>
            <option>Shared Room</option>
            <option>Apartment</option>
            <option>PG</option>
          </select>

          <select
            name="furnishing"
            className="w-full border p-3 rounded-xl"
            value={form.furnishing}
            onChange={handleChange}
          >
            <option>Furnished</option>
            <option>Semi Furnished</option>
            <option>Unfurnished</option>
          </select>

          <input
            type="date"
            name="available_from"
            className="w-full border p-3 rounded-xl"
            value={form.available_from}
            onChange={handleChange}
          />

          <input
            name="image"
            placeholder="Image URL"
            className="w-full border p-3 rounded-xl"
            value={form.image}
            onChange={handleChange}
          />

          <textarea
            rows="5"
            name="description"
            placeholder="Property Description"
            className="w-full border p-3 rounded-xl"
            value={form.description}
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "Saving..." : "Add Property"}
          </button>
        </form>
      </div>
    </div>
  );
}