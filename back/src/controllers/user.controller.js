import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../libs/jwt.js";
import { token_secret } from "../config.js";



// ? Registrar usuario
export const register = async (req, res) => {
  const { name, email, password, companyID } = req.body;
  try {
    const emailLow = email.toLowerCase();
    const userFound = await User.findOne({ email: emailLow });
    if (userFound) {
      // return res.status(400).json({ success: false, message: 'Mail is already in use' });
      const errorObject = { success: false, message: 'Email is already in use' };
      const errorString = JSON.stringify(errorObject);
      throw new Error(errorString);
    }

    const passwordaHash = await bcrypt.hash(password, 10);

    var newUser;
    if (companyID) {
      newUser = new User({
        name,
        email,
        password: passwordaHash,
        companyID,
        EUA: true,
      })
      await newUser.save();
      return res.status(201).json({ message: "User Successfully Created" })

    } else {
      newUser = new User({
        name,
        email,
        password: passwordaHash,
      });
    }

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });
    res.cookie('token', token);

    res.status(200).json({
      success: true,
      message: 'Successfully registered user',
      user: {
        id: userSaved._id,
        name: userSaved.name,
        email: userSaved.email,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'There was an error registering the user. Check email.',
    });
  }
};


// ? Start section
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailLow = email.toLowerCase();

    const user = await User.findOne({ email: emailLow });
    if (!user) return res.status(404).json({ message: "Users not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = await createAccessToken({ id: user._id });

    res.cookie("token", token);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      UA: user.UA,
      EUA: user.EUA,
      companyID: user.companyID ? user.companyID : ""
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// ? Go out
export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(500)
  }
}

// ? Change Password
export const updatePassword = async (req, res) => {
  const user = req.user
  const { password, newPassword, matchPassword } = req.body
  try {
    const userFound = await User.findById(user.id)
    if (!userFound) return res.status(404).json({ message: "Users not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    if (newPassword !== matchPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(user.id, { password: hashedPassword });

    res.status(201).json({ message: "updated password" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//? Verify the token in the cookies
export const verityToken = async (req, res) => {
  try {
    const { token } = req.cookies;
    console.log(token)
    if (!token) return res.status(401).json([""]);

    jwt.verify(token, token_secret, async (err, user) => {
      if (err) return res.status(401).json(["Not authorized"]);

      const userFound = await User.findById(user.id);

      if (!userFound) return res.status(401).json(["Not authorized"]);

      return res.json({
        id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        UA: userFound.UA,
        EUA: userFound.EUA,
        companyID: userFound.companyID ? userFound.companyID : ""
      });
    });
  } catch (error) {
    console.log(error);
  }
};


// ? Delete user
// ! In future versions make robust validations
export const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const userFound = await User.findByIdAndDelete(id)
    if (!userFound) return res.status(404).json({ message: "User not found" })

    res.status(204).json({
      name: userFound.name,
      email: userFound.email
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Error" })
  }

}
