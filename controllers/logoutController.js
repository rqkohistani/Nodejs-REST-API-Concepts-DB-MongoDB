const User = require("../model/User");

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken, it cannot be done in the backend. It should be done in the memory of the client application in the frontend.
  // cookies can be deleted in the backend, but not the accessToken.
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
    // FIXME: in production, set secure: true
    // res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );
  const result = await foundUser.save();
  console.log(result);

  // FIXME: Currently the cookies are not deleted via the browser request. It works via postman.
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
  // FIXME: in production, set secure: true
  // res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

module.exports = { handleLogout };
