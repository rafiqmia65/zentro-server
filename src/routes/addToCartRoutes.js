import express from "express";
import { addToCart, deleteCartItem, getCartItems } from "../controllers/addToCartControllers.js";

const router = express.Router();

router.post("/", addToCart); // Add to cart
router.get("/:userId", getCartItems); // Get user cart
router.delete("/:cartId", deleteCartItem); // Delete item

export default router;
