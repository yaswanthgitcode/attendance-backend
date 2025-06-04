const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Replace below with your actual MongoDB URI
mongoose.connect('YOUR_MONGODB_URI_HERE')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Schema
const DataSchema = new mongoose.Schema({
  name: String,
  attendance: String,
  task: String,
  date: String,
});

const Entry = mongoose.model('Entry', DataSchema);

// POST route
app.post('/api/submit', async (req, res) => {
  try {
    const entry = new Entry(req.body);
    await entry.save();
    res.status(200).json({ message: 'Saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
