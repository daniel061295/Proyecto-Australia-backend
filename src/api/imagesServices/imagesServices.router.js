import { Router } from 'express';
import { ImagesServiceController } from './imagesServices.controller.js';
import { ImagesServiceSchema } from './imagesServices.schema.js';
import { uploadImageMiddleware, uploadMultipleImagesMiddleware } from '../../middlewares/upload.js';

export const createImagesServiceRouter = ({ imagesServiceModel }) => {
  const imagesServiceRouter = Router();

  const imagesServiceSchema = new ImagesServiceSchema();
  const imagesServiceController = new ImagesServiceController({ Model: imagesServiceModel, Schema: imagesServiceSchema });

  imagesServiceRouter.get('/', imagesServiceController.getAll);
  imagesServiceRouter.post('/', uploadMultipleImagesMiddleware, imagesServiceController.create);

  imagesServiceRouter.get('/:id', imagesServiceController.getById);
  imagesServiceRouter.delete('/:id', imagesServiceController.delete);
  imagesServiceRouter.put('/:id', uploadImageMiddleware, imagesServiceController.update);


  return imagesServiceRouter;
};
