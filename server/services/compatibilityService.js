import { supabase } from "./supabaseService.js";
import { generateCompatibilityScore } from "./aiService.js";

export async function calculateCompatibility(
  tenantId,
  propertyId
) {

  // Get Property
  const { data: property, error: propertyError } = await supabase
    .from("properties")
    .select("*")
    .eq("id", propertyId)
    .single();

  if (propertyError) throw propertyError;

  // Get Tenant Profile
  const { data: tenant, error: tenantError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", tenantId)
    .single();

  if (tenantError) throw tenantError;

  // Gemini AI
  const result = await generateCompatibilityScore(
    tenant,
    property
  );

  // Save Result
  await supabase
    .from("interests")
    .update({
      compatibility_score: result.score,
      compatibility_explanation: result.summary,
    })
    .eq("tenant_id", tenantId)
    .eq("property_id", propertyId);

  return result;
}