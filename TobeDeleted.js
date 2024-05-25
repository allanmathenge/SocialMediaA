import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./model/User.js";

/* Authentication */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare({ password: user.password });
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete password;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: `Error occured: ${err.message}` });
  }
};
