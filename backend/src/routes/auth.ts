import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => {
  // Handle login logic
  res.send('Logged in');
});

router.post('/register', (req, res) => {
  // Handle registration
  res.send('Registered');
});

export default router;