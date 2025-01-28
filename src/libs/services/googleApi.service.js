import fs from "fs";
import { google } from "googleapis";
// import mime from 'mime'
import googleApiKey from "../../../api_key.json" assert { type: "json" };
import { FOLDERID, GOOGLE_API_CLIENT_ID, GOOGLE_API_CLIENT_SECRET, GOOGLE_API_REDIRECT_URI, REFRESH_TOKEN } from '../../config.js'


const SCOPE = ['https://www.googleapis.com/auth/drive'];

// const file = './static/docs/PAGOS VANTI.pdf';


export const authorize = async () => {
  const jwtClient = new google.auth.JWT(
    googleApiKey.client_email,
    null,
    googleApiKey.private_key,
    SCOPE
  )

  await jwtClient.authorize();
  return jwtClient;
}

export const authorizeOAuth2Client = async () => {
  const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_API_CLIENT_ID,
    GOOGLE_API_CLIENT_SECRET,
    GOOGLE_API_REDIRECT_URI
  )

  await oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  return oAuth2Client;
}


export const uploadFile = async (authClient, file, folderId) => {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: "v3", auth: authClient });

    const fileMetadata = {
      name: file.originalname, // Nombre original del archivo
      parents: [folderId], // Carpeta destino
    };

    drive.files.create(
      {
        resource: fileMetadata,
        media: {
          mimeType: file.mimetype, // Tipo MIME del archivo
          body: file.stream, // Buffer del archivo
        },
        fields: "id",
      },
      (err, file) => {
        if (err) {
          return reject(err);
        }
        resolve(file.data);
      }
    );
  });
};

export const listFiles = async (authClient, folderId) => {

  const drive = google.drive({ version: "v3", auth: authClient });
  const res = await drive.files.list({
    q: `'${folderId}' in parents`, // Filtra por la carpeta
    // fields: "files(id, name, parents)",
  });

  const files = res.data.files;
  if (files.length === 0) {
    console.log('No files found.');
    return;
  }
  return files
};

export const downloadFile = async (authClient, fileId) => {
  const drive = google.drive({ version: "v3", auth: authClient });

  // Get file metadata to retrieve the file name
  const fileMetadata = await drive.files.get({ fileId });
  const fileName = fileMetadata.data.name;

  // Download the file
  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );
  return res.data;
  // const dest = fs.createWriteStream(fileName);
  // console.log(fileName);
  // res.data
  //   .on('end', () => console.log('Archivo descargado.'))
  //   .on('error', (err) => console.error('Error al descargar:', err))
  //   .pipe(dest);
}

// console.log({ FOLDERID, GOOGLE_API_CLIENT_ID, GOOGLE_API_CLIENT_SECRET, GOOGLE_API_REDIRECT_URI, REFRESH_TOKEN })
// const folderId = FOLDERID;
// const authClient = await authorize();

// const authClient = await authorizeOAuth2Client();

// const files = await listFiles(authClient, folderId);

// files.map((file) => {
//   console.log(file);
// });
// const fileId = files[0].id;
// const fileId = '15IpeOLLQ1t39QLEhkfnnvNbrokHNjpFR'
// downloadFile(authClient, fileId);
//
// console.log(fileId);