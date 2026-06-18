// const express = require('express');
// const multer = require('multer');
// const { uploadImage } = require('../services/cloudinaryService');
// const { protect } = require('../middleware/authMiddleware');

// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });

// router.post('/', protect, upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }
//     const result = await uploadImage(req.file.buffer);
//     res.status(200).json({ imageUrl: result.secure_url });
//   } catch (error) {
//     res.status(500).json({ message: 'Image upload failed', error: error.message });
//   }
// });

// module.exports = router;


const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../services/cloudinaryService');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// CHANGE 1: Added a 5MB limit to protect your server's memory
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 3000000 } 
});

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const result = await uploadImage(req.file.buffer);
    
    // CHANGE 2: Send back just the raw URL string so the React frontend can read it easily
    // res.json(result.secure_url); 
    res.json({ imageUrl: result.secure_url });
    
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
});

module.exports = router;