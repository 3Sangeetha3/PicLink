require('dotenv').config();
const express = require('express');
const cors = require('cors');
const corsOptions = require("./config/corsOptions");
const imageRoutes = require('./routes/imageRoutes');
const path = require('path');
const fs = require('fs');

// Ensure necessary directories exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  //console.log("Created uploads directory at:", uploadsDir);
}

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.options('*', cors(corsOptions));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'PicLink Server is running',
  });
});

app.use("/", imageRoutes);

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`PicLink Server running on http://localhost:${PORT}`);
});