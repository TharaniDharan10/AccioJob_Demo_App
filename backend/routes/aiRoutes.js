const express = require('express');
const axios = require('axios');

module.exports = (redis) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

      const cached = await redis.get(prompt);
      if (cached) return res.json({ source: 'cache', code: cached });

      const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      }, {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const code = response.data.choices[0].message.content;
      redis.set(prompt, code, 'EX', 3600);
      res.json({ source: 'ai', code });

    } catch (err) {
      console.error('Backend AI error:', err.message || err);
      res.status(500).json({ error: 'Something went wrong with OpenRouter API' });
    }
  });

  return router;
};
