import { Router } from 'express';
import { CategoryController } from '../controllers/categories.js';

export const createCategoryRouter = ({ categoryModel }) => {
  const categoryRouter = Router();

  const categoryController = new CategoryController({ categoryModel });

  categoryRouter.get('/', categoryController.getAll);
  categoryRouter.post('/', categoryController.create);

  categoryRouter.get('/:id', categoryController.getById);
  categoryRouter.delete('/:id', categoryController.delete);
  categoryRouter.put('/:id', categoryController.update);

  return categoryRouter;
};
