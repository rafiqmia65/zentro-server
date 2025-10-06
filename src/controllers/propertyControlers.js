import PropertyModel from "../models/propertyModel.js";

// Create a new property
export const createProperty = async (req, res) => {
  try {
    const propertyData = req.body;

    //Check if a property with the same title already exists in the same city
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

    //Create a new property instance
    const newProperty = new PropertyModel({
      title: propertyData.title,
      description: propertyData.description,
      images: propertyData.images,
      price: propertyData.price,
      propertyCategory: propertyData.propertyCategory || [], // checkbox selected features,
      propertyFeatures: propertyData.propertyFeatures || [], // checkbox selected features
      propertyArea: propertyData.propertyArea,
      location: propertyData.location,
      status: propertyData.status || "available",
    });

    //Save the property to MongoDB
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

//  Get All Properties
export const getAllProperty = async (req, res) => {
  try {
    //  Get all properties sorted by latest created
    const allProperty = await PropertyModel.find().sort({ createdAt: -1 });

    // If no properties found
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

//  Get Single Property
export const singleProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // Find property by ID
    const singleProperty = await PropertyModel.findById(id);

    //  If property not found
    if (!singleProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Single property retrieved successfully",
      data: singleProperty,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update Property
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    //  Check if property exists
    const existingProperty = await PropertyModel.findById(id);

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }
    //  Update property with new data
    const updatedProperty = await PropertyModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// delete a property
export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if property exists
    const existingProperty = await PropertyModel.findById(id);
    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Delete the property
    await PropertyModel.findByIdAndDelete(id);

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
