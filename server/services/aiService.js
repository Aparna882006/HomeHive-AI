import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateCompatibilityScore(tenant, property) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
You are a Tinder-style AI Match Engine for Rental Properties.

Your job is to compare ONE tenant with ONE property.

Think exactly like Tinder:
- Reward strong matches.
- Penalize mismatches.
- Never give repetitive scores.
- Every property should receive a different score.
- Be realistic.

Analyze:

Tenant:
${JSON.stringify(tenant, null, 2)}

Property:
${JSON.stringify(property, null, 2)}

Consider:

1. Budget compatibility
2. Preferred city/location
3. Property type
4. Furnished preference
5. Bedrooms / Space
6. Gender preference
7. Lifestyle compatibility
8. Safety & rating
9. Amenities
10. Overall suitability

Return ONLY valid JSON.

{
  "score": 92,

  "explanation":"Excellent budget and location fit with suitable lifestyle.",

  "highlights":[
    "Rent comfortably fits the tenant budget",
    "Located in the preferred city",
    "Property size matches tenant needs",
    "Furnished apartment matches preference",
    "Highly rated and safe neighbourhood"
  ],

  "breakdown":[
    {
      "key":"budget",
      "label":"Budget Match",
      "score":23,
      "reason":"Rent is comfortably within tenant budget."
    },
    {
      "key":"location",
      "label":"Location Match",
      "score":24,
      "reason":"Property is in tenant's preferred location."
    },
    {
      "key":"lifestyle",
      "label":"Lifestyle Match",
      "score":22,
      "reason":"Lifestyle preferences are highly compatible."
    },
    {
      "key":"space",
      "label":"Space Match",
      "score":23,
      "reason":"Bedrooms and living area meet requirements."
    }
  ],

  "tags":[
    "Budget Fit",
    "Great Location",
    "Lifestyle Match",
    "Good Space"
  ]
}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    console.log("========== GEMINI RAW ==========");
    console.log(text);
    console.log("================================");

    const match = text.match(/\{[\s\S]*\}/);

    if (!match) {
      throw new Error("Gemini returned invalid JSON");
    }

    const parsed = JSON.parse(match[0]);

    return {
      score: parsed.score ?? 75,

      explanation:
        parsed.explanation ??
        "Good compatibility between tenant and property.",

      highlights:
        parsed.highlights ??
        [],

      breakdown:
        parsed.breakdown ??
        [],

      tags:
        parsed.tags ??
        [],
    };
  } catch (error) {
    console.log("GEMINI ERROR:", error);

    const score = 70 + Math.floor(Math.random() * 20);

    return {
      score,

      explanation:
        "Compatibility generated using fallback analysis.",

      highlights: [
        "Budget appears suitable",
        "Location is reasonably matched",
        "Property meets most requirements",
        "Lifestyle compatibility looks good",
      ],

      breakdown: [
        {
          key: "budget",
          label: "Budget Match",
          score: 18,
          reason: "Rent fits within estimated budget.",
        },
        {
          key: "location",
          label: "Location Match",
          score: 17,
          reason: "Property location is reasonably suitable.",
        },
        {
          key: "lifestyle",
          label: "Lifestyle Match",
          score: 17,
          reason: "Lifestyle preferences are mostly compatible.",
        },
        {
          key: "space",
          label: "Space Match",
          score: 18,
          reason: "Property offers sufficient living space.",
        },
      ],

      tags: [
        "Budget Fit",
        "Location Match",
        "Good Lifestyle",
      ],
    };
  }
}