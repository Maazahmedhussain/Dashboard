import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  // Check if token exists
  if (!token) {
    console.log("❌ No token provided");
    return res.status(401).json({ message: "Unauthorized - No token provided" });
  }

  try {
    // Remove "Bearer " prefix if present
    const cleanToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
    
    console.log("🔍 Token received:", cleanToken);

    // Verify the token
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
    
    console.log("✅ Token valid, user:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ Invalid Token Error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
