import express from 'express';
import {generateImage} from '../../generateImage';

const router = express.Router();

router.post('/generate-thumbnail', async (req, res) => {
  const {prompt, filename} = req.body;

  try {
    await generateImage(prompt, filename);
    res.json({message: 'Thumbnail generated successfully!'});
  } catch (error) {
    const err = error as Error;
    res.status(500).json({error: err.message});
  }
});

export default router;
