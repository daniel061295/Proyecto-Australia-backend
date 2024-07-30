import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';

const app = express();
app.disable('x-powered-by');
app.use(corsMiddleware());
app.use(json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});
// run server
const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
