/* eslint-disable space-before-function-paren */
import { validateProfile, validatePartialProfile } from '../schemas/profiles.js';

export class ProfileController {
  constructor({ profileModel }) {
    this.profileModel = profileModel;
  }

  getAll = async (req, res) => {
    const { status, profiles } = await this.profileModel.getAll();
    if (status) return res.json(profiles);
    res.status(500).json({ message: `Error on get profile: ${profiles}` });
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const { status, profile } = await this.profileModel.getById({ id });
    if (status) return res.json(profile);
    res.status(404).json({ message: 'Profile not found' });
  };

  create = async (req, res) => {
    const result = validateProfile(req.body);

    if (!result.success) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }
    const { status, profile } = await this.profileModel.createNew({ input: result.data });
    if (status) return res.status(201).json(profile);
    res.status(500).json({ message: `Error creating profile: ${profile}` });
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const { status, message } = await this.profileModel.delete({ id });

    if (status === false) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.json({ message });
  };

  update = async (req, res) => {
    const result = validatePartialProfile(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const { status, profile, message } = await this.profileModel.updateByPk({ id, input: result.data });

    if (status) return res.status(201).json(profile);
    if (message) return res.status(404).json({ message });
    res.status(500).json({ message: 'Error on updating profile' });
  };
}
