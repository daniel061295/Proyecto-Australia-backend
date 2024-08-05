/* eslint-disable space-before-function-paren */
import { validateSubmenu, validatePartialSubmenu } from '../schemas/submenus.js';

export class SubmenuController {
  constructor({ submenuModel }) {
    this.submenuModel = submenuModel;
  }

  getAll = async (req, res) => {
    const { status, submenus } = await this.submenuModel.getAll();
    if (status) return res.json(submenus);
    res.status(500).json({ message: `Error on get submenu: ${submenus}` });
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const { status, submenu } = await this.submenuModel.getById({ id });
    if (status) return res.json(submenu);
    res.status(404).json({ message: 'Submenu not found' });
  };

  create = async (req, res) => {
    const result = validateSubmenu(req.body);

    if (!result.success) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }
    const { status, submenu } = await this.submenuModel.createNew({ input: result.data });
    if (status) return res.status(201).json(submenu);
    res.status(500).json({ message: `Error creating submenu: ${submenu}` });
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const { status, message } = await this.submenuModel.delete({ id });

    if (status === false) {
      return res.status(404).json({ message: 'Submenu not found' });
    }

    return res.json({ message });
  };

  update = async (req, res) => {
    const result = validatePartialSubmenu(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const { status, submenu, message } = await this.submenuModel.updateByPk({ id, input: result.data });

    if (status) return res.status(201).json(submenu);
    if (message) return res.status(404).json({ message });
    res.status(500).json({ message: 'Error on updating submenu' });
  };
}
