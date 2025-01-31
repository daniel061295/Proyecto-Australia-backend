import { BaseController } from '../../libs/BaseController.js';
import { deleteFile } from '../../libs/utils/deleteFile.js';

export class ImagesServiceController extends BaseController {
  create = async (req, res) => {
    const validationResult = this.Schema.validate(req.body);
    if (!validationResult.success) {
      return res.status(422).json({ error: JSON.parse(validationResult.error.message) });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(422).json({ error: 'No files uploaded' });
    }

    try {
      const instances = await Promise.all(req.files.map(async (file) => {
        const payload = {
          imageUrl: file.path,
          ...validationResult.data
        };
        return await this.Model.createNew({ input: payload });
      }));

      const successfulInstances = instances.filter(({ status }) => status);
      if (successfulInstances.length === 0) {
        return res.status(500).json({ message: "Error creating instances for all files." });
      }

      res.status(201).json(successfulInstances.map(({ result }) => result));
    } catch (error) {
      res.status(500).json({ message: `Error on create method: ${error.message}` });
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;

    try {
      const byId = await this.Model.getById({ id });
      if (!byId.status) {
        return res.status(404).json({ message: `Object with id: ${id} not found` });
      }

      const { imageUrl } = byId.result;
      const fileResult = await deleteFile(imageUrl);

      if (!fileResult.success) {
        const errorMessage = fileResult.errorCode === 'ENOENT'
          ? 'File not found!'
          : 'Error deleting the file.';
        return res.status(fileResult.errorCode === 'ENOENT' ? 404 : 500).json({ error: errorMessage });
      }

      const { status, message } = await this.Model.delete({ id });
      if (!status) {
        return res.status(404).json({ message });
      }

      return res.status(200).json({ message });

    } catch (error) {
      console.error(`Error in delete handler: ${error.message}`);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;

    try {
      const validationResult = this.Schema.validatePartial(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ error: JSON.parse(validationResult.error.message) });
      }

      let payload = validationResult.data;
      if (req.file) {
        const byId = await this.Model.getById({ id });
        if (!byId.status) {
          return res.status(404).json({ message: `Object with id: ${id} not found` });
        }

        const { imageUrl } = byId.result;
        if (imageUrl && imageUrl !== req.file.path) {
          const fileResult = await deleteFile(imageUrl);
          if (!fileResult.success) {
            const errorMessage = fileResult.errorCode === 'ENOENT'
              ? 'File not found!'
              : 'Error deleting the file.';
            return res.status(fileResult.errorCode === 'ENOENT' ? 404 : 500).json({ error: errorMessage });
          }
        }

        payload = { ...payload, imageUrl: req.file.path };
      }

      const { status, result, message } = await this.Model.updateByPk({ id, input: payload });

      if (status) return res.status(200).json(result);
      if (message) return res.status(404).json({ message });

      return res.status(500).json({ message: `Error on update method: ${result}` });

    } catch (error) {
      console.error(`Error in update handler: ${error.message}`);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  };

  updateByService = async (req, res) => {

    if (!req.files || req.files.length === 0) {
      return res.status(422).json({ error: 'No files uploaded' });
    }
    const validationResult = this.Schema.validatePartial(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ error: JSON.parse(validationResult.error.message) });
    }
    const { serviceId } = req.query;
    const { result } = await this.Model.getByFilter({ column: 'serviceId', id: serviceId });
    if (!result) {
      return res.status(404).json({ message: `Object with id: ${serviceId} has no files stored` });
    }
    const flag = await this.deleteFilesByService(result);
    if (!flag) {
      return res.status(500).json({ message: `Error deleting files for serviceId: ${serviceId}` });
    }

    try {
      const instances = await Promise.all(req.files.map(async (file) => {
        const payload = {
          imageUrl: file.path,
          ...validationResult.data
        };
        return await this.Model.createNew({ input: payload });
      }));

      const successfulInstances = instances.filter(({ status }) => status);
      if (successfulInstances.length === 0) {
        return res.status(500).json({ message: "Error creating instances for all files." });
      }

      res.status(201).json(successfulInstances.map(({ result }) => result));
    } catch (error) {
      res.status(500).json({ message: `Error on create method: ${error.message}` });
    }

  }

  deleteFilesByService = async (context) => {

    return await Promise.all(context.map(async (record) => {
      const statusDeletedFiles = await deleteFile(record.dataValues.imageUrl);
      const statusDeletedRecords = await this.Model.delete({ id: record.dataValues.idImagesService })
      // console.log(statusDeletedFiles);
      // console.log(statusDeletedRecords);
      return statusDeletedFiles;
    }));

  }
}