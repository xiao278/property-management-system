import { Router } from 'express';
import { Users } from '../../../database/models/Users';
import { LoginForm } from '../../../interface/Auth';
import { authenticateToken } from '../middlewares/tokenAuth';
import jwt from 'jsonwebtoken';

const authRoutes = Router();

authRoutes.post('/login', async (req, res) => {
  const loginForm:LoginForm = req.body;
  const user = await Users.findOne({where: {username: loginForm.username}})
  if (!user || loginForm.password != user.getDataValue('password')) {
    res.status(401).json({error: "Invalid Credentials"})
  }
  else {
    // issue json web token if auth passed
    const token = jwt.sign(
      { 
        username: loginForm.username,
        isAdmin: user.getDataValue('role') == 'admin'
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
    res.json({token})
  }
});

authRoutes.post('/checkAuth', authenticateToken, async (req, res) => {
  res.json({message: "token OK"});
});

export { authRoutes };