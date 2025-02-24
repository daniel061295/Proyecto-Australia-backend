import multer from "multer";
import { Readable } from "stream"; // Importamos el módulo de streams
import { authorize, uploadFile, authorizeOAuth2Client } from "../libs/services/googleApi.service.js";
import { FOLDERID } from "../config.js";


export const uploadDocumentOnMemoryMiddleware = (req, res, next) => {
  const upload = multer({ storage: multer.memoryStorage() });
  upload.single("file")(req, res, async (err) => {

    if (err) {
      return res.status(500).json({ message: "Error al cargar el archivo: " + err.message });
    }
    const folderId = FOLDERID; // ID de la carpeta en Google Drive

    try {
      // const authClient = await authorizeOAuth2Client();

      if (!req.file) {
        next();
        // return res.status(400).json({ message: "No se proporcionó ningún archivo." });
      } else {
        const file = req.file;
        const authClient = await authorize();
        // Convertimos el buffer en un Readable Stream
        const stream = new Readable();
        stream.push(file.buffer);
        stream.push(null); // Indicamos que el stream ha terminado

        // Modificamos `uploadFile` para aceptar el stream
        const driveResponse = await uploadFile(authClient, {
          stream,
          mimetype: file.mimetype,
          originalname: file.originalname,
        }, folderId);

        // console.log("Archivo subido a Google Drive:", driveResponse);
        req.file.driveId = driveResponse.id; // Opcional: guardamos el ID del archivo subido
        next();
      }
    } catch (error) {
      console.error("Error al subir archivo a Google Drive:", error);
      res.status(500).json({ message: "Error al subir archivo a Google Drive: " + error.message });
    }
  });
};


export const uploadMultipleDocumentOnMemoryMiddleware = (req, res, next) => {
  const upload = multer({ storage: multer.memoryStorage() });
  upload.array("files", 10)(req, res, async (err) => { // Cambia "file" a "files" y establece un límite de 10 archivos
    if (err) {
      return res.status(500).json({ message: "Error al cargar los archivos: " + err.message });
    }
    const folderId = FOLDERID; // ID de la carpeta en Google Drive
    try {
      if (!req.files || req.files.length === 0) {
        next();
        // return res.status(400).json({ message: "No se proporcionaron archivos." });
      } else {
        const authClient = await authorize();

        req.ids = []
        // Iteramos sobre cada archivo
        for (const file of req.files) {
          // Convertimos el buffer en un Readable Stream
          const stream = new Readable();
          stream.push(file.buffer);
          stream.push(null); // Indicamos que el stream ha terminado

          // Modificamos `uploadFile` para aceptar el stream
          const driveResponse = await uploadFile(authClient, {
            stream,
            mimetype: file.mimetype,
            originalname: file.originalname,
          }, folderId);

          // Opcional: guardamos el ID del archivo subido en el objeto file
          req.ids.push(driveResponse.id);
        }
        console.log(req.ids)

        next();
      }
    } catch (error) {
      console.error("Error al subir archivos a Google Drive:", error);
      res.status(500).json({ message: "Error al subir archivos a Google Drive: " + error.message });
    }
  });
};

