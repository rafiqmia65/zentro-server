import PropertyModel from "../models/propertyModel.js";

// Create a new property
export const createProperty = async (req, res) => {
  try {
    const propertyData = req.body;

    // Check if a property with the same title already exists in the same city
    const existingProperty = await PropertyModel.findOne({
      title: propertyData.title,
      "location.city": propertyData.location.city,
    });

    if (existingProperty) {
      return res.status(400).json({
        success: false,
        message: "Property with this title already exists in this city",
      });
    }

    // Create a new property instance
    const newProperty = new PropertyModel({
      title: propertyData.title,
      description: propertyData.description,
      images: propertyData.images,
      price: propertyData.price,
      propertyCategory: propertyData.propertyCategory || [], //chackbox sellection
      propertyFeatures: propertyData.propertyFeatures || [], //chackbox sellection
      propertyArea: propertyData.propertyArea,
      location: propertyData.location,
      status: propertyData.status || "available",
    });

    // Save the property to MongoDB
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

// Get all properties
export const getAllProperty = async (req, res) => {
  try {
    // Retrieve all properties sorted by creation date (latest first)
    const allProperty = await PropertyModel.find().sort({ createdAt: -1 });

    // Return 404 if no properties found
    if (!allProperty || allProperty.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No properties found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Properties retrieved successfully",
      data: allProperty,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a single property by ID
export const singleProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Find property by ID
    const property = await PropertyModel.findById(propertyId);

    // Return 404 if property not found
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Single property retrieved successfully",
      data: property,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a property by ID
export const updateProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const updateData = req.body;

    // Check if the property exists before updating
    const existingProperty = await PropertyModel.findById(propertyId);

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Update the property with new data and return the updated document
    const updatedProperty = await PropertyModel.findByIdAndUpdate(
      propertyId,
      updateData,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a property by ID
export const deleteProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Check if the property exists before deleting
    const existingProperty = await PropertyModel.findById(propertyId);
    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Delete the property from MongoDB
    await PropertyModel.findByIdAndDelete(propertyId);

    return res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
