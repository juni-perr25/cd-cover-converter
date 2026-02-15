const express = require('express');
const multer = require('multer');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint for batch image upload
app.post('/upload', upload.array('images'), (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files uploaded.');
    }

    const archive = archiver('zip', { zlib: { level: 9 } });
    res.attachment('images.zip');
    archive.pipe(res);

    req.files.forEach(file => {
        archive.append(file.buffer, { name: file.originalname });
    });

    archive.finalize();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
