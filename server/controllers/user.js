import User from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const file = req.file; // Access the uploaded file

  try {
    if (!username || !email || !password || !file) {
      return res.status(400).json("All fields are required");
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json("User already exists");

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
      profileImage: file.filename, // Correctly access the 'filename' property
    });

    res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({
      msg: "Something went wrong while signing up",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json("all fields are required");
    }

    const existedUser = await User.findOne({ email });

    if (!existedUser) return res.status(400).json("user not found");

    const isMatch = await bcrypt.compare(password, existedUser.password);

    if (!isMatch) return res.status(400).json("wrong password");

    const token = jwt.sign(
      { userId: existedUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({ token, profileImage: existedUser.profileImage });
  } catch (error) {
    return res.status(500).json(error);
  }
};
