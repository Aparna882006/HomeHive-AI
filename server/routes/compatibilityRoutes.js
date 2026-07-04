import express from "express";
import { supabase } from "../supabaseClient.js";
import { generateCompatibilityScore } from "../services/aiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { tenantId, propertyId } = req.body;

    console.log("REQUEST BODY:", req.body);

    // ---------------- VALIDATION ----------------
    if (!tenantId || !propertyId) {
      return res.status(400).json({
        success: false,
        message: "tenantId and propertyId required",
      });
    }

    // ---------------- GET TENANT ----------------
    const { data: tenant, error: tenantError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", tenantId)
      .single();

    if (tenantError || !tenant) {
      console.log("TENANT ERROR:", tenantError);

      return res.status(400).json({
        success: false,
        message: "Tenant not found",
        error: tenantError,
      });
    }

    // ---------------- GET PROPERTY ----------------
    const { data: property, error: propertyError } = await supabase
      .from("properties")
      .select("*")
      .eq("id", propertyId)
      .single();

    if (propertyError || !property) {
      console.log("PROPERTY ERROR:", propertyError);

      return res.status(400).json({
        success: false,
        message: "Property not found",
        error: propertyError,
      });
    }

    console.log("TENANT:", tenant);
    console.log("PROPERTY:", property);

    // ---------------- AI CALL ----------------
    const aiResult = {
  score: 87,
  explanation:
    "Excellent match. Budget fits well and preferred location matches the property.",
  breakdown: [
    {
      label: "Location Match",
      score: 24,
      reason: "Property is in the preferred location."
    },
    {
      label: "Budget Match",
      score: 23,
      reason: "Rent is within the tenant's budget."
    },
    {
      label: "Lifestyle Match",
      score: 20,
      reason: "Property suits the tenant's lifestyle."
    },
    {
      label: "Space Match",
      score: 20,
      reason: "Room size and amenities meet expectations."
    }
  ],
  tags: [
    "Budget Fit",
    "Location Match",
    "Move Ready"
  ],
  highlights: [
    "Affordable",
    "Great Location",
    "Available Immediately"
  ]
};

    console.log("AI RESULT:", aiResult);

    // ---------------- VALIDATE AI RESPONSE ----------------
    if (!aiResult || typeof aiResult.score !== "number") {
      return res.status(500).json({
        success: false,
        message: "AI failed to generate valid response",
      });
    }

    return res.json({
  success: true,
  score: aiResult.score,
  explanation: aiResult.explanation,
  breakdown: aiResult.breakdown,
  tags: aiResult.tags,
  highlights: aiResult.highlights,
});

  } catch (error) {
    console.log("SERVER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;