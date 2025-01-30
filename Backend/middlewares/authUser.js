import jwt from "jsonwebtoken";

// user auth middleware

const authUser = async (req, res, next) => {
  try {
    const AccessToken = req.cookies.AccessToken || req.headers['authorization']?.split(' ')[1];
    if (!AccessToken) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const decodedToken = jwt.decode(AccessToken);
    req.body.userId = decodedToken._id;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export default authUser;
