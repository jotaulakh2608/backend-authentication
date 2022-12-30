import user from "../Schema/user-schema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const create_token = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10s" });
};
const create_refresh_token = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "20s",
  });
};

export const login = async (request, response) => {
  const { email, password } = request.body;
  try {
    const User = await user.login(email, password);
    const token = create_token(User._id);
    const refreshToken = create_refresh_token(User._id);
    console.log(User);
    response.status(200).json({ token, id:User._id, refreshToken });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

export const refreshToken = (req, res) => {
  const token = req.cookies.token;
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      if (decoded) {
        const { id } = decoded;
        const token = create_token(id);
        res.status(200).json({ token, id });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const signup = async (request, response) => {
  const { email, password } = request.body;
  try {
    const User = await user.signup(email, password);
    const token = create_token(User._id);
    const refreshToken = create_refresh_token(User._id);
    console.log(User);
    response.status(200).json({ token, id:User._id, refreshToken });
  } catch (error) {
    console.log(error.message);
    response.status(400).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const User = await user.findOne({ _id: id });
    res.status(200).json(User)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
