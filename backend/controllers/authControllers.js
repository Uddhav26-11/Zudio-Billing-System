const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("BODY:", req.body);
    const user = await User.findOne({ email });
    console.log("USER:", user);

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      token,
      user
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  login
};