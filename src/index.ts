import express from 'express';
import mongoose from 'mongoose';
import bookRoutes from './routes/books.js';

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/bookshelfdb')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Connection error', err));
  
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});