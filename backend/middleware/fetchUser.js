var jwt = require("jsonwebtoken");
const JWT_SECRET2 = "hellowmynameisadityajugganaut";
fetchUser = (req, res, next) => {
  // get the user form the jwt authtoken and id to request object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET2);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};
module.exports = fetchUser;
