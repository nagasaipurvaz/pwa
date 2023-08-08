const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// MongoDB setup
const mongoURI = 'mongodb+srv://purvaz:purvaz@cluster0.ywkwpmm.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define the schema
const inputSchema = new mongoose.Schema({
  inputString: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const connectionCountSchema = new mongoose.Schema({
    count: { type: Number, default: 0 }
  });
  

// Define the model
const InputModel = mongoose.model('Input', inputSchema);
const ConnectionCount = mongoose.model('ConnectionCount', connectionCountSchema);

// API endpoints
app.post('/api/input', (req, res) => {
  const { inputString } = req.body;
  if (!inputString) {
    return res.status(400).json({ error: 'Input string is required.' });
  }

  const newInput = new InputModel({ inputString });
  newInput.save()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: 'Error saving input.', details: err }));
    
});

app.post('/api/log-frontend-connection', async (req, res) => {
    try {
      const existingCount = await ConnectionCount.findOne();
  
      if (existingCount) {
        existingCount.count++;
        await existingCount.save();
        console.log('Frontend connected. Connection count:', existingCount.count);
        res.json({ message: 'Connection logged successfully.' });
      } else {
        const newCount = new ConnectionCount();
        await newCount.save();
        console.log('Frontend connected. Connection count:', newCount.count);
        res.json({ message: 'Connection logged successfully.' });
      }
    } catch (err) {
      console.error('Error logging frontend connection:', err);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });


app.get('/api/check',(req,res)=>{
    res.send("this is check ");
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
