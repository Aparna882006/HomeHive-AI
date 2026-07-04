import { calculateCompatibility } from "../services/compatibilityService.js";

export async function generateCompatibility(req, res) {

  try {

    const { tenantId, propertyId } = req.body;

    const result = await calculateCompatibility(
      tenantId,
      propertyId
    );

    res.json(result);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }

}