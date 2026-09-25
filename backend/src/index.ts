import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

app.use(cors({
  origin: '*',
}));
app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(Number(PORT), HOST, () => {
  console.log(`[Backend] Server is running on http://${HOST}:${PORT}`);
  console.log(`[Backend] Health check endpoint: http://${HOST}:${PORT}/api/health`);
});
