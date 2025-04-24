
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 5000;

const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.use(express.static('public'));
app.use(express.json());

// Simulated database
let submissions = [];
const dailyContent = {
    image: 'https://source.unsplash.com/random/800x600/?nature,peaceful',
    text: "Every day is a fresh start. Make it count! ✨"
};

app.get('/daily-content', (req, res) => {
    res.json(dailyContent);
});

app.post('/submit-content', upload.single('image'), (req, res) => {
    const submission = {
        text: req.body.text,
        image: req.file ? `/uploads/${req.file.filename}` : null,
        timestamp: new Date()
    };
    submissions.push(submission);
    res.status(200).json({ message: 'Submission received' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
