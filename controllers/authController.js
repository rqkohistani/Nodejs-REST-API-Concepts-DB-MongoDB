const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" } // 5 minutes
      // FIXME:In production, use 5-15 minutes
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    console.log(roles);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      // FIXME: In production, turn on "secure: true". For the development, it should be false. because postman won't work with secure: true and you get empty response if secure is set to true. req.cookies is empty.
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken, username: foundUser.username, roles: roles });
    /**
     * Step.2:
     * cookie
     * If you send the refreshToken in the json response, This will kind of creates a dilemma for the frontend developer because the frontend developer will have to save the refreshToken in the local storage. And this is not secure. So we should send the refreshToken as a cookie. And this is the way to do it.
     * Sending refreshToken to the client as a cookie. Yes, sending the refreshToken as a cookie can be vulnerable. But if httpOnly is set to true, then the cookie cannot be accessed with javascript. So it is not really that vulnerable. So we should send the refreshToken as a cookie.
     */
    /**
     * Step.1:
     * Sending to the client the accessToken and the refreshToken
     * The frontend developer should save the accessToken in memory. It is not secure to save it in the local storage. Any cookie that can be access with javascript it is not really that secure. So we should save it in memory.
     */
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
