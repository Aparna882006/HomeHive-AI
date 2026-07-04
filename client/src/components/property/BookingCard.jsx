import { useEffect, useState } from "react";
import {
  Calendar,
  Sparkles,
} from "lucide-react";

import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function BookingCard({ property }) {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [interested, setInterested] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [displayScore, setDisplayScore] = useState(0);

  // ---------------- Animate Score ----------------

  useEffect(() => {
    if (aiResult?.score) {
      animateScore(aiResult.score);
    }
  }, [aiResult]);

  function animateScore(target) {
    let current = 0;

    const interval = setInterval(() => {
      current += 2;

      if (current >= target) {
        current = target;
        clearInterval(interval);
      }

      setDisplayScore(current);
    }, 10);
  }

  // ---------------- Load Existing Interest ----------------

  useEffect(() => {
    if (user && property) {
      checkInterest();
    }
  }, [user, property]);

  async function checkInterest() {
    try {
      const { data, error } = await supabase
        .from("interests")
        .select("*")
        .eq("property_id", property.id)
        .eq("tenant_id", user.id)
        .maybeSingle();

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        setInterested(true);

        setAiResult({
          score: data.compatibility_score || 0,
          explanation:
            data.compatibility_explanation || "",

          breakdown:
            data.compatibility_breakdown || [],

          highlights:
            data.compatibility_highlights || [],

          tags:
            data.compatibility_tags || [],
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // ---------------- Generate AI ----------------

  async function sendInterest() {
    if (!user) {
      toast.error("Please Login First");
      return;
    }

    if (interested) {
      toast("Already Interested");
      return;
    }

    try {
      setLoading(true);

      // Save Interest

      const { data: interest, error } =
        await supabase
          .from("interests")
          .insert({
            property_id: property.id,
            owner_id: property.owner_id,
            tenant_id: user.id,
            status: "Pending",
          })
          .select()
          .single();

      if (error) {
        toast.error(error.message);
        return;
      }

      // Call AI

      const response = await fetch(
        "http://localhost:5000/api/compatibility",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            tenantId: user.id,
            propertyId: property.id,
          }),
        }
      );

      const ai = await response.json();

      if (!response.ok) {
        toast.error(
          ai.message || "AI Failed"
        );

        return;
      }

      // Save AI Result

      await supabase
        .from("interests")
        .update({
          compatibility_score: ai.score,

          compatibility_explanation:
            ai.explanation,

          compatibility_breakdown:
            ai.breakdown,

          compatibility_highlights:
            ai.highlights,

          compatibility_tags:
            ai.tags,
        })
        .eq("id", interest.id);

      // Update UI

      setAiResult({
        score: ai.score,

        explanation:
          ai.explanation,

        breakdown:
          ai.breakdown || [],

        highlights:
          ai.highlights || [],

        tags:
          ai.tags || [],
      });

      setInterested(true);

      toast.success(
        "AI Match Generated 🚀"
      );
    } catch (err) {
      console.log(err);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const score =
    displayScore || aiResult?.score || 0;
      return (
    <div className="w-full max-w-[420px] sticky top-28">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6">

        {/* PRICE */}
        <h2 className="text-4xl font-bold text-green-600">
          ₹{property.price?.toLocaleString()}
          <span className="text-lg text-gray-500">/month</span>
        </h2>

        {/* AI CARD */}
        <div className="mt-6 rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 p-5">

          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="text-purple-600" size={22} />
            <h3 className="font-bold text-purple-700 text-lg">
              AI Compatibility Score
            </h3>
          </div>

          {/* SCORE CIRCLE */}
          <div className="flex justify-center mb-6">
            <div className="relative w-44 h-44">

              <svg className="w-44 h-44 -rotate-90">
                <circle
                  cx="88"
                  cy="88"
                  r="70"
                  stroke="#E9D5FF"
                  strokeWidth="12"
                  fill="none"
                />

                <circle
                  cx="88"
                  cy="88"
                  r="70"
                  stroke="#22c55e"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="440"
                  strokeDashoffset={
                    440 - (440 * score) / 100
                  }
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">

                <span className="text-4xl font-bold">
                  {score}%
                </span>

                <span
                  className={`mt-2 text-sm font-semibold ${
                    score >= 85
                      ? "text-green-600"
                      : score >= 70
                      ? "text-yellow-600"
                      : "text-red-500"
                  }`}
                >
                  {score >= 85
                    ? "Excellent Match"
                    : score >= 70
                    ? "Good Match"
                    : "Needs Improvement"}
                </span>

              </div>

            </div>
          </div>

          {/* AI EXPLANATION */}

          {aiResult?.explanation && (
            <div className="bg-white rounded-2xl border p-4 mb-4">
              <h4 className="font-semibold text-purple-700 mb-2">
                🤖 Why AI gave this score?
              </h4>

              <p className="text-gray-600 leading-6 text-sm">
                {aiResult.explanation}
              </p>
            </div>
          )}

          {/* HIGHLIGHTS */}

          {aiResult?.highlights?.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-4">

              <h4 className="font-semibold text-green-700 mb-3">
                ✅ AI Likes
              </h4>

              <div className="space-y-2">
                {aiResult.highlights.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span>✔️</span>
                      <span>{item}</span>
                    </div>
                  )
                )}
              </div>

            </div>
          )}

          {/* TAGS */}

          {aiResult?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">

              {aiResult.tags.map(
                (tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium"
                  >
                    #{tag}
                  </span>
                )
              )}

            </div>
          )}

          {/* BREAKDOWN */}

          {aiResult?.breakdown?.length > 0 && (
            <div className="space-y-3">

              {aiResult.breakdown.map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border p-4"
                  >

                    <div className="flex justify-between items-center mb-2">

                      <h4 className="font-semibold">
                        {item.label}
                      </h4>

                      <span className="text-green-600 font-bold">
                        {item.score}/25
                      </span>

                    </div>

                    <p className="text-sm text-gray-500">
                      {item.reason}
                    </p>

                  </div>
                )
              )}

            </div>
          )}

        </div>

        {/* BUTTON */}

        <button
          onClick={sendInterest}
          disabled={loading || interested}
          className={`w-full mt-6 py-4 rounded-2xl text-white font-semibold transition ${
            interested
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading
            ? "Analyzing AI..."
            : interested
            ? "Interest Sent ✓"
            : "Send Interest + AI Match"}
        </button>

        {/* VISIT */}

        <button className="w-full mt-4 border py-4 rounded-2xl font-semibold flex justify-center items-center gap-2 hover:bg-gray-50">
          <Calendar size={18} />
          Schedule Visit
        </button>

      </div>
    </div>
  );
}