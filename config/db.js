const { MongoClient } = require('mongodb');

const connectDB = async () => {
  try {
    const client = new MongoClient('mongodb+srv://user_admin:user_admin@cluster0.koelu3t.mongodb.net/');
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('user_management'); 
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
};

module.exports = connectDB;
