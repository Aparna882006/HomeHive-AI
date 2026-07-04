import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    role: "Tenant",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSignup(e) {
    e.preventDefault();

    setLoading(true);

    // Create Authentication Account
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    // Insert Profile into profiles table
    if (data.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          role: form.role,
        });

      if (profileError) {
        console.error("Profile Insert Error:", profileError);

        alert(profileError.message);

        setLoading(false);
        return;
      }
    }

    setLoading(false);

    alert("Signup Successful!");

    navigate("/login");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#faf7f2]">
      <form
        onSubmit={handleSignup}
        className="bg-white p-10 rounded-3xl shadow-xl w-[430px]"
      >
        <h1 className="text-3xl font-bold text-center mb-8">
          Create Account
        </h1>

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          className="w-full border p-3 rounded-xl mb-4"
          value={form.full_name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl mb-4"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl mb-4"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-3 rounded-xl mb-4"
          value={form.phone}
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full border p-3 rounded-xl mb-6"
          value={form.role}
          onChange={handleChange}
        >
          <option value="Tenant">Tenant</option>
          <option value="Owner">Owner</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="text-center mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-green-600 ml-2"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}