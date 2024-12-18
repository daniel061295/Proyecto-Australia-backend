import multer from "multer";
import path from "path";

const errorMessage = "Invalid file format. Only JPEG, PNG, and GIF are allowed."

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage, fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error(errorMessage));
    }
  }
});

export const uploadImageMiddleware = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      if (err.message === errorMessage) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: "An unexpected error occurred while uploading the image." + err.message });
    }
    next();
  })
};