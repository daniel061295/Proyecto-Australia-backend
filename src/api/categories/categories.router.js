import { Router } from 'express';
import { CategorySchema } from './categories.schema.js';
import { CategoryController } from './categories.controller.js';

export const createCategoryRouter = ({ categoryModel }) => {
  const categoryRouter = Router();

  const categorySchema = new CategorySchema();
  const categoryController = new CategoryController({ Model: categoryModel, Schema: categorySchema });

  categoryRouter.get('/', categoryController.getAll);
  categoryRouter.post('/', categoryController.create);

  categoryRouter.get('/:id', categoryController.getById);
  categoryRouter.delete('/:id', categoryController.delete);
  categoryRouter.put('/:id', categoryController.update);

  return categoryRouter;
};
