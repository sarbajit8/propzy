import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models/index.js';

//routes import
import adminRegisterRouter from './routes/admin/adminRegister.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares 
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/admin/register', adminRegisterRouter);

//Error handling middleware

//testing the database connection
app.get('/', async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res.send(`Connected to database: ${process.env.DB_NAME}`);
  } catch (error) {
    res.status(500).send(`Error connecting to database: ${error.message}`);
  }
});

// Sync database models
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
    console.log('Backend connected successfully to the database');
    //server running
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });