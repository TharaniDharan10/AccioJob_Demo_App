app.post('/session', async (req, res) => {
  const { title, description } = req.body;

  try {
    const session = new Session({ title, description });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
