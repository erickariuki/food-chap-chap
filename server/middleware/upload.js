export const uploadImage = (req, res, next) => {
    upload.single('image')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(422).json({ error: "File upload error" });
      } else if (err) {
        // An unknown error occurred when uploading.
        res.status(500).json({ error: "Internal Server Error" });
      }
      // Everything is fine, move on to the next middleware or route handler.
      next();
    });
};