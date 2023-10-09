const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const path = require('path');
const crypto = require('crypto');
const router = express.Router();

const conn = mongoose.connection;
const gfs = Grid(conn.db, mongoose.mongo);

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('image'), (req, res) => {
  const { originalname, buffer } = req.file;

  const writeStream = gfs.createWriteStream({
    filename: originalname,
  });

  writeStream.write(buffer);
  writeStream.end();

  writeStream.on('close', () => {
    res.status(200).json({ message: 'Image uploaded successfully' });
  });
});

module.exports = router;
