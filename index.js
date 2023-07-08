const express = require('express');
const app = express();
const connectDB = require('./config/db');
const authenticationMiddleware = require('./middlewares/authentication');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');

const startServer = async () => {
  try {
    await connectDB(); 

    app.use(bodyParser.json());

    app.use('/auth', authRoutes);
    app.use('/users', authenticationMiddleware, userRoutes);

    app.post('/register', async (req, res) => {
        try {
          const { name, email, password } = req.body;
      
          const db = await connectDB(); 
          const existingUser = await db.collection('users').findOne({ email });
          if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
          }
      
          const newUser = { name, email, password };
          await db.collection('users').insertOne(newUser);
      
          return res.json({ msg: 'User registered successfully' });
        } catch (error) {
          console.log('Error during registration:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
      });

      app.post('/login', async (req, res) => {
        try {
          const { email, password } = req.body;
      
          const db = await connectDB(); 
          const user = await db.collection('users').findOne({ email });
          if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }
      
          return res.json({ msg: 'User login successful' });
        } catch (error) {
          console.log('Error during login:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
      });
      
    const port = 4000;
    app.listen(port, () => {
      console.log(`Server running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();
