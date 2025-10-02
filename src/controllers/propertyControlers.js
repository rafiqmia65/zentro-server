import Property from "../models/propertyModel.js";

export const createProperty = async (req, res) => {
  try {
    const propertyData = req.body;

    // Check if property already exists
    const existingProperty = await Property.findOne({
      title: propertyData.title,
      "location.city": propertyData.location.city,
    });

    if (existingProperty) {
      return res.status(400).json({
        success: false,
        message: "Property already exists in this city",
      });
    }

    // Create a new property instance
    const newProperty = new Property(propertyData);

    // Save property in MongoDB
    await newProperty.save();

    return res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: newProperty,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
