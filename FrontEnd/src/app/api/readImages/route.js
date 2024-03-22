// pages/api/readImages.js

import fs from 'fs';
import path from 'path';

export default function GET(req, res) {
  const directory = req.query.directory;
  const directoryPath = path.join(process.cwd(), 'images', 'traits', directory);
  
  try {
    // Read images from directory
    const images = fs.readdirSync(directoryPath).map((file) => {
      return {
        src: `/images/traits/${directory}/${file}`,
        alt: file.replace(/\.[^/.]+$/, ''), // Remove file extension for alt text
      };
    });
    res.status(200).json(images);
  } catch (error) {
    console.error(`Error reading images from ${directoryPath}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
