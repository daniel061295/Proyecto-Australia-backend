/* eslint-disable space-before-function-paren */
import { validateMenu, validatePartialMenu } from '../schemas/menus.js';

export class MenuController {
  constructor({ menuModel }) {
    this.menuModel = menuModel;
  }

  getAll = async (req, res) => {
    const { status, menus } = await this.menuModel.getAll();
    if (status) return res.json(menus);
    res.status(500).json({ message: `Error on get menu: ${menus}` });
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const { status, menu } = await this.menuModel.getById({ id });
    if (status) return res.json(menu);
    res.status(404).json({ message: 'Menu not found' });
  };

  create = async (req, res) => {
    const result = validateMenu(req.body);

    if (!result.success) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }
    const { status, menu } = await this.menuModel.createNew({ input: result.data });
    if (status) return res.status(201).json(menu);
    res.status(500).json({ message: `Error creating menu: ${menu}` });
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const { status, message } = await this.menuModel.delete({ id });

    if (status === false) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    return res.json({ message });
  };

  update = async (req, res) => {
    const result = validatePartialMenu(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const { status, menu, message } = await this.menuModel.updateByPk({ id, input: result.data });

    if (status) return res.status(201).json(menu);
    if (message) return res.status(404).json({ message });
    res.status(500).json({ message: 'Error on updating menu' });
  };
}
