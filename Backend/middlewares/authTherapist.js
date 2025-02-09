import jwt from "jsonwebtoken";

//  auth middleware

const authTherapist = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const decodedToken = jwt.decode(token);
    req.body.therapistId = decodedToken._id;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export default authTherapist;
