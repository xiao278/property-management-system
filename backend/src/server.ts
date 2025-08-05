import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/api/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/auth',authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});