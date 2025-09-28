const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // token was signed for admin
    if (
      decoded &&
      decoded.role === "admin" &&
      decoded.email === process.env.ADMIN_EMAIL
    ) {
      req.admin = decoded;
      return next();
    }
    return res.status(403).json({ message: "Forbidden" });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { adminAuth };