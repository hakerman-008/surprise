const express = require('express');
const app = express();
const port = 5000;

app.use(express.static('public'));

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});