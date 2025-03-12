import express, { Request, Response } from 'express';
import User, { IUser } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Register user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exsist' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: IUser = new User({
      email,
      password: hashedPassword,
    });
    await user.save();

    res.json({ message: 'User created successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// logout user

export default router;
