const express = require('express');
const bcrypt = require('bcrypt');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const User = require('../models/User');
const { authenticateUser } = require('../middleware/auth');
const fs = require('fs');  // For saving the image locally (optional)
const path = require('path');  // For handling file paths

const router = express.Router();

// You can keep the multer setup if you want to handle file uploads via multer (remove this if using base64)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});
const upload = multer({ storage });

// Update profile route
router.put('/updateProfile', authenticateUser, upload.single('profileImage'), async (req, res) => {
  try {
    console.log('Request body:', req.body); // Logs the incoming form data
    console.log('Uploaded file (multer):', req.file); // Logs the uploaded file

    const { username, password, specialty } = req.body;
    const userId = req.user.id;

    if (!username || !specialty) {
      return res.status(400).json({ message: 'Username and specialty are required' });
    }

    const updatedData = { name: username, specialty };

    // If a password is provided, hash it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    // If file is uploaded, update the profileImage URL
    if (req.file) {
      updatedData.profileImage = req.file.secure_url; // Cloudinary file URL
    } else if (req.body.profileImage) {
      // If the profileImage is in base64 format, store it directly (though this should be rare now)
      updatedData.profileImage = req.body.profileImage;
    }

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
