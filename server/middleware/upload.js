import multer from 'multer';

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination folder where uploaded files will be stored
    cb(null, 'uploads/'); // You might need to create the 'uploads' folder in your project
  },
  filename: function (req, file, cb) {
    // Define the file name for the uploaded file
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Multer upload instance
const upload = multer({ storage: storage }).single('image'); // 'image' should match the field name in your form data

export { upload };
