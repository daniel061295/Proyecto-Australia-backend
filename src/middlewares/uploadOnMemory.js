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
