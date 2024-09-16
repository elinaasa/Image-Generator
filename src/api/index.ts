import express from 'express';
import imageRouters from './routes/imageRoute';

import {MessageResponse} from '../types/MessageTypes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (_req, res) => {
  res.json({
    message: 'routes: comments and images',
  });
});

router.use('/images', imageRouters);

export default router;
