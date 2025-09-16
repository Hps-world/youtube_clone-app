import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';


import authRoutes from './routes/authRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import channelRoutes from './routes/channelRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';


const app = express();


app.use(helmet ? helmet() : (req,res,next)=>next());
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => res.json({ ok: true, message: 'YouTube Clone API' }));


app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/comments', commentRoutes);


// global error handler
app.use(errorHandler);


export default app;