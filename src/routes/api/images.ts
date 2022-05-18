import express from 'express';
import { promises as fsPromises } from 'fs';

const images = express.Router();

images.get('/', async (req, res) => {
    const image = req.query.name as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    const resize_path = `./assets/images/output/${image}_${width}_${height}.jpeg`;

    const img = await fsPromises.readFile(resize_path).catch(() => {
        res.status(500).send('Error occured while processing the image');
    });
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(img, 'binary');
});

export default images;
