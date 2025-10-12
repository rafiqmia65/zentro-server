import addToCartModel from "../models/addToCartModel.js";
import propertyModel from "../models/propertyModel.js";

// -----------------------------
// Add property to cart
// -----------------------------
export const addToCart = async (req, res) => {
  try {
    const { userId, email, propertyId } = req.body;

    if (!userId || !email || !propertyId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const existing = await addToCartModel.findOne({ userId, propertyId });
    if (existing) {
      return res
        .status(200)
        .json({ success: false, message: "Property already in your cart" });
    }

    const cartItem = await addToCartModel.create({ userId, email, propertyId });
    res.status(201).json({ success: true, data: cartItem });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// -----------------------------
// Get all cart items (with property info)
// -----------------------------
export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await addToCartModel.find({ userId });

    const cartWithDetails = await Promise.all(
      cartItems.map(async (item) => {
        const property = await propertyModel.findById(item.propertyId);
        return { ...item._doc, property };
      })
    );

    res.status(200).json({ success: true, data: cartWithDetails });
  } catch (err) {
    console.error("Get cart items error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// -----------------------------
// Delete a cart item
// -----------------------------
export const deleteCartItem = async (req, res) => {
  try {
    const { cartId } = req.params;
    const deleted = await addToCartModel.findByIdAndDelete(cartId);

    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });

    res.status(200).json({ success: true, message: "Cart item deleted" });
  } catch (err) {
    console.error("Delete cart item error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
