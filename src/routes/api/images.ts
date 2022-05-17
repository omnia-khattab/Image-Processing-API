import express from 'express';
import { promises as fsPromises } from 'fs';

const images = express.Router();
const resize_path = `./assets/images/output/resizedImage.jpeg`;

images.get('/', async (req, res) => {
    
    const img = await fsPromises.readFile(resize_path).catch((error) => {
        throw error;
    });
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(img, 'binary');
    
    
    });

export default images;
