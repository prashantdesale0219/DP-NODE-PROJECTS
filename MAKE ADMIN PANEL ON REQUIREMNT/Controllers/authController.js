const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const UserModel = require("../Models/user");

const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (role) {
    return res
      .status(400)
      .send({ message: "Role should not be provided at signup" });
  }

  if (!name || !email || !password) {
    return res.status(400).send({ message: "Please fill in all fields" });
  }

  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).send({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    await UserModel.create({ name, email, password: hashedPassword });
    return res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Please fill in all fields" });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).send({ message: "Email does not exist" });
  }
  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      return res.status(500).send({ message: "Internal server error" });
    }
    if (result) {
      const { password, ...rest } = user._doc;
      jwt.sign({ userData: rest }, "02192611", function (err, token) {
        if (err) {
          return res.status(400).send({ message: "err compare token" });
        }
        res
          .cookie("AccessToken", token)
          .status(200)
          .json({ message: "user login", userData: rest });
      });
    } else {
      return res.status(400).send({ message: "Invalid password" });
    }
  });
};

module.exports = { signup, signin };
