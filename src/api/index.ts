import express from 'express';
import imageRouters from './routes/imageRoute';

import {MessageResponse} from '../types/MessageTypes';

const router = express.Router();

// Root route to confirm API location
router.get<{}, MessageResponse>('/', (_req, res) => {
  res.json({
    message: 'routes: comments and images',
  });
});

// Register image routes under /images
router.use('/images', imageRouters);

export default router;
