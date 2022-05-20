import express from 'express';
import { promises as fsPromises } from 'fs';
import { resizeMiddleware, validation } from './../../utilities/middleware';
import path from 'path';


const images = express.Router();

images.get(
    '/api/images',
    validation,
    resizeMiddleware,
    async (req: express.Request, res: express.Response): Promise<void> => {
        const image:string = req.query.name as string;
        const width: number = parseInt(req.query.width as string);
        const height: number = parseInt(req.query.height as string);

        const resize_path: string = path.resolve(
            __dirname,
            `./../../../assets/images/output/${image}_${width}_${height}.jpeg`
        );
        const img = await fsPromises.readFile(resize_path).catch((error) => {
            res.status(500).send({
                message: error.message,
                resize_path: resize_path,
            });
            return;
        });
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(img, 'binary');
    }
);

export default images;
