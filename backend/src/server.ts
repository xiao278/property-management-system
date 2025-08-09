import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth';
import { sequelize } from '../../database/main';
import { Users } from '../../database/models/Users.model'

dotenv.config();

const app = express();
const PORT = process.env.PORT

const corsOptions = {
  origin: ["http://192.168.67.117:8989", "http://localhost:8989"],
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

app.use('/api/auth',authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

sequelize.authenticate().then(() => {
    console.log('Database Connection has been established successfully.');
}).catch((error:Error) => {
    console.error('Unable to connect to the database: ', error.message);
});