import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';

const App = express();
await connectDB();

App.use(cors());
App.use(express.json());

const PORT = process.env.PORT || 5000;

App.get('/', (req, res) => {
  res.send('Hello World!');
}); 

App.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});