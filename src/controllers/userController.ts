import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';


const generateToken = (id: any) => {
  return jwt.sign({ id:id }, process.env.JWT_SECRET || '', { expiresIn: '3h' });
};


export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { Name,email, password, confirmPassword } = req.body;

  // if (Name! || !email || !password || !confirmPassword) {
  //   // return res.status(400).json({ error: 'Name,Email, password, and confirm password are required' });
  // }


  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({
      Name,
      email,
      password: hashedPassword,
      confirmPassword:hashedPassword,
      role: 'user',
    });
 
   const user = await newUser.save();
    
    const token = generateToken(newUser._id);

    res.status(201).json({ message: 'User created successfully',user,token });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

 
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

   
    const token = generateToken(user._id);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    next(error);
  }
};
