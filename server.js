import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'https://flames-calculator.netlify.app']
}));
app.use(express.json());

mongoose.connect('mongodb+srv://1234:2498@cluster0.bdlu1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const flamesSchema = new mongoose.Schema({
  name1: String,
  name2: String,
  relationship: String,
  timestamp: { type: Date, default: Date.now }
});

const Flames = mongoose.model('Flames', flamesSchema);

app.post('/api/flames', async (req, res) => {
  try {
    const { name1, name2, relationship } = req.body;
    const flames = new Flames({ name1, name2, relationship });
    await flames.save();
    res.json({ success: true, relationship });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/history', async (req, res) => {
  try {
    const history = await Flames.find().sort({ timestamp: -1 }).limit(10);
    res.json(history);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});