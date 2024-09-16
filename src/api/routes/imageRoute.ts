import {generateImage} from '../../generateImage';
import express from 'express';

const router = express.Router();

// Route to generate a new YouTube thumbnail
router.post('/generate-thumbnail', async (req, res) => {
  const {prompt, filename} = req.body;

  try {
    await generateImage(prompt, filename);
    res.json({message: 'Thumbnail generated successfully!'});
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
});

export default router;
