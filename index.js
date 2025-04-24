
const express = require('express');
const app = express();
const port = 5000;

app.use(express.static('public'));
app.use(express.json());

app.post('/calculate', (req, res) => {
  const { num1, num2 } = req.body;
  const result = parseFloat(num1) + parseFloat(num2);
  res.json({ result });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
