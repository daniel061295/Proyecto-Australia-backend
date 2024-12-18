import { Router } from 'express';
import { CategorySchema } from './categories.schema.js';
import { CategoryController } from './categories.controller.js';
import { uploadImageMiddleware } from '../../middlewares/upload.js';

export const createCategoryRouter = ({ categoryModel }) => {
  const categoryRouter = Router();

  const categorySchema = new CategorySchema();
  const categoryController = new CategoryController({ Model: categoryModel, Schema: categorySchema });

  categoryRouter.get('/', categoryController.getAll);
  categoryRouter.post('/', uploadImageMiddleware, categoryController.create);

  categoryRouter.get('/:id', categoryController.getById);
  categoryRouter.delete('/:id', categoryController.delete);
  categoryRouter.put('/:id', uploadImageMiddleware, categoryController.update);

  return categoryRouter;
};
