const express = require('express');
const Session = require('../models/Session');
const router = express.Router();

router.get('/', async (req, res) => {
  const sessions = await Session.find();
  res.json(sessions);
});

router.post('/', async (req, res) => {
  const session = new Session(req.body);
  await session.save();
  res.json(session);
});

module.exports = router;
