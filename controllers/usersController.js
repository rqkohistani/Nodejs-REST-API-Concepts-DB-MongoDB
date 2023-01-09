const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found." });
  const filteredUsers = users.map((user) => {
    return {
      username:user.username,
      roles:user.roles,
      refreshTOken: user?.refreshToken
    }
  });

  res.json(filteredUsers);
};

module.exports = {
  getAllUsers,
};
