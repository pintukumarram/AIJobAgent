import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("No token found in headers");
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT token:", decoded);

    req.user = await User.findById(decoded.id).select("-password");
    console.log("User fetched from DB:", req.user);

    if (!req.user) {
      console.log("User not found for ID:", decoded.id);
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    res.status(401).json({ message: "Token failed" });
  }
};

// ✅ Role-based access
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Not authorized for this action" });
    }
    next();
  };
};

export default protect;
