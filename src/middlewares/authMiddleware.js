import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET 
const SECRET = "TestSecretForNow"

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded
        next();
    } catch (err) {
        return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
};
