import { Router } from 'express';
import { CategorySchema } from '../schemas/categories.js';
import { CategoryController } from '../controllers/categories.js';

export const createCategoryRouter = ({ categoryModel }) => {
  const categoryRouter = Router();

  const categorySchema = new CategorySchema();
  const categoryController = new CategoryController({ baseModel: categoryModel, baseSchema: categorySchema });

  categoryRouter.get('/', categoryController.getAll);
  categoryRouter.post('/', categoryController.create);

  categoryRouter.get('/:id', categoryController.getById);
  categoryRouter.delete('/:id', categoryController.delete);
  categoryRouter.put('/:id', categoryController.update);

  return categoryRouter;
};
