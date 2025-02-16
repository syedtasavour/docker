// filepath: /docker-project/backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the Backend API!');
});

// Example API endpoint
app.get('/api/data', (req, res) => {
    const sampleData = {
        message: 'This is some sample data from the backend!',
        timestamp: new Date(),
    };
    res.json(sampleData);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});