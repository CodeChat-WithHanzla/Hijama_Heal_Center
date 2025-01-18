import jwt from "jsonwebtoken";

// admin auth middleware

const authAdmin = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export default authAdmin;
