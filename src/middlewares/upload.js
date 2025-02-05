import multer from "multer";
import path from "path";
import fs from "fs";
import { vectortile_v1 } from "googleapis";

const errorMessage = "Invalid file format. Only JPEG, PNG, and GIF are allowed.";

const createUploadMiddleware = (destinationPath, filter) => {

  const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true }); // Crea las carpetas necesarias
    }
  };

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      ensureDirectoryExists(destinationPath);
      cb(null, destinationPath); // Usa la ruta definida al configurar el middleware
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const fileTypes = filter;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);

      if (extname && mimetype) {
        cb(null, true);
      } else {
        cb(new Error(errorMessage));
      }
    }
  });

  return {
    singleFileMiddleware: (req, res, next) => {
      upload.single('file')(req, res, (err) => {
        if (req.file) {
          if (err) {
            if (err.message === errorMessage) {
              return res.status(400).json({ message: err.message });
            }
            return res.status(500).json({ message: "An unexpected error occurred while uploading the image: " + err.message });
          }
        }
        next();
      });

    },
    multipleFilesMiddleware: (req, res, next) => {
      upload.array('files')(req, res, (err) => {
        if (req.file) {
          if (err) {
            if (err.message === errorMessage) {
              return res.status(400).json({ message: err.message });
            }
            return res.status(500).json({ message: "An unexpected error occurred while uploading the images: " + err.message });
          }
        }
        next();
      });
    }
  };
};

const uploadImagesToStatic = createUploadMiddleware('./static', /jpeg|jpg|png|gif/)
const uploadImageMiddleware = uploadImagesToStatic.singleFileMiddleware
const uploadMultipleImagesMiddleware = uploadImagesToStatic.multipleFilesMiddleware

const uploadPdfToStaticDocs = createUploadMiddleware('./static/docs', /pdf/)
const uploadDocumentMiddleware = uploadPdfToStaticDocs.singleFileMiddleware
const uploadMultipleDocumentsMiddleware = uploadPdfToStaticDocs.multipleFilesMiddleware

export { uploadImageMiddleware, uploadMultipleImagesMiddleware, uploadDocumentMiddleware, uploadMultipleDocumentsMiddleware }
// app.post('/upload-single', singleFileMiddleware);
// app.post('/upload-multiple', multipleFilesMiddleware);
