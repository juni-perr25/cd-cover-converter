'use strict';

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route handler
app.get('/', (req, res) => {
    res.send('Welcome to the CD Cover Converter!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});