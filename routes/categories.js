import { Router } from 'express';
import { CategoryController } from '../controllers/categories.js';

export const createCategoriesRouter = ({ categoryModel }) => {
  const categoriesRouter = Router();

  const categoryController = new CategoryController({ categoryModel });

  categoriesRouter.get('/', categoryController.getAll);
  categoriesRouter.post('/', categoryController.create);

  categoriesRouter.get('/:id', categoryController.getById);
  categoriesRouter.delete('/:id', categoryController.delete);
  categoriesRouter.patch('/:id', categoryController.update);

  return categoriesRouter;
};
