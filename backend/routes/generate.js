const express = require('express');
const router = express.Router();
require('dotenv').config();

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;


    const code = `// Component based on: ${prompt}\nfunction MyComponent() {\n  return <div>${prompt}</div>;\n}`;

    // Send the generated code back
    res.status(200).json({ code });
  } catch (err) {
    console.error('Generate error:', err);
    res.status(500).json({ message: 'Generation failed', error: err.message });
  }
});

module.exports = router;
