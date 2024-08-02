/* eslint-disable space-before-function-paren */
import { validateCategory, validatePartialCategory } from '../schemas/categories.js';

export class CategoryController {
  constructor({ categoryModel }) {
    this.categoryModel = categoryModel;
  }

  getAll = async (req, res) => {
    const { status, categories } = await this.categoryModel.getAll();
    if (status) return res.json(categories);
    res.status(500).json({ message: 'Error on get category' });
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const { status, category } = await this.categoryModel.getById({ id });
    if (status) return res.json(category);
    res.status(404).json({ message: 'Category not found' });
  };

  create = async (req, res) => {
    const result = validateCategory(req.body);

    if (!result.success) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }

    const { status, newCategory } = await this.categoryModel.create({ input: result.data });

    if (status) return res.status(201).json(newCategory);
    res.status(500).json({ message: 'Error on creating category' });
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const { status, message } = await this.categoryModel.delete({ id });

    if (status === false) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.json({ message });
  };

  update = async (req, res) => {
    const result = validatePartialCategory(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    const { status, updatedCategory } = await this.categoryModel.update({ id, input: result.data });

    if (status) return res.status(201).json(updatedCategory);
    res.status(500).json({ message: 'Error on updating category' });
  };
}
