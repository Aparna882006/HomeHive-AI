import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    // Get user role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    setLoading(false);

    if (profileError) {
      alert("Unable to fetch user profile.");
      return;
    }

    alert("Login Successful!");

    // Redirect based on role
    if (profile.role === "Owner") {
      navigate("/owner");
    } else if (profile.role === "Admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#faf7f2]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-3xl shadow-xl w-[420px]"
      >
        <h1 className="text-3xl font-bold text-center mb-8">
          Welcome Back
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-6">
          Don't have an account?

          <Link
            to="/signup"
            className="text-green-600 ml-2"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}