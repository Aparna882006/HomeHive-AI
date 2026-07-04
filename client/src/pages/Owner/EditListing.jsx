import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    room_type: "",
    furnishing: "",
    available_from: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    fetchProperty();
  }, []);

  async function fetchProperty() {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast.error(error.message);
      navigate("/owner/my-listings");
      return;
    }

    setForm({
      title: data.title || "",
      location: data.location || "",
      price: data.price || "",
      room_type: data.room_type || "",
      furnishing: data.furnishing || "",
      available_from: data.available_from || "",
      image: data.image || "",
      description: data.description || "",
    });

    setLoading(false);
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);

    const { error } = await supabase
      .from("properties")
      .update({
        title: form.title,
        location: form.location,
        price: Number(form.price),
        room_type: form.room_type,
        furnishing: form.furnishing,
        available_from: form.available_from,
        image: form.image,
        description: form.description,
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Property Updated Successfully");

    navigate("/owner/my-listings");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        Loading Property...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] py-10">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold mb-8">
          Edit Property
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Property Title"
            className="w-full border rounded-xl p-3"
            required
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border rounded-xl p-3"
            required
          />

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Rent"
            className="w-full border rounded-xl p-3"
            required
          />

          <select
            name="room_type"
            value={form.room_type}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option>Private Room</option>
            <option>Shared Room</option>
            <option>Apartment</option>
            <option>PG</option>
          </select>

          <select
            name="furnishing"
            value={form.furnishing}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option>Furnished</option>
            <option>Semi Furnished</option>
            <option>Unfurnished</option>
          </select>

          <input
            type="date"
            name="available_from"
            value={form.available_from}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border rounded-xl p-3"
          />

          <textarea
            rows="5"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded-xl p-3"
          />

          <div className="flex gap-4">

            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
            >
              {saving ? "Updating..." : "Update Property"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/owner/my-listings")}
              className="flex-1 bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}