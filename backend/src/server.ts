import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth';
import { housingRoutes } from './routes/housing';
import { roomRoutes } from './routes/rooms';
import { sequelize } from '../../database/main';
import { renovationRoutes } from './routes/renovation';
import { categoryRoutes } from './routes/category';

dotenv.config();

const app = express();
const PORT = process.env.PORT

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}

app.use(cors(corsOptions));

app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/housing', housingRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/renovation', renovationRoutes);
app.use('/api/category', categoryRoutes);

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

sequelize.authenticate().then(() => {
    console.log('Database Connection has been established successfully.');
}).catch((error:Error) => {
    console.error('Unable to connect to the database: ', error.message);
});