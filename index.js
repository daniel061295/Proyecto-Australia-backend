import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { createCategoriesRouter } from './routes/categories.js';
import { Category } from './models/categories.js';

const app = express();
app.disable('x-powered-by');
app.use(corsMiddleware());
app.use(json());

app.use('/categories', createCategoriesRouter({ categoryModel: Category }));
// run server
const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
