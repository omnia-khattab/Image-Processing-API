import express from 'express';
import sharp from 'sharp';
import { promises as fsPromises } from 'fs';
import { existsSync } from 'node:fs';

const resize = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    
        const image = req.query.name as string;
        const width = parseInt(req.query.width as string);
        const height = parseInt(req.query.height as string);

        const img_path = `./assets/images/full/${image}.jpg`;
        const resize_path = `./assets/images/output/${image}_${width}_${height}.jpeg`;

        //chech if there's an exact image with the same properties
        if(existsSync(resize_path)){
            const img = await fsPromises.readFile(resize_path)
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(img, 'binary');
        }
        else{
            await sharp(img_path).resize(width, height).toFile(resize_path);
            next();
        }
        
        
    
};

const validation = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    const image = req.query.name as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);
    
    if (Object.keys(req.query).length === 0) {
        res.send('add image properties to resize it');
        //res.redirect('/api/images');
        return;
    }
    else if (image === undefined || image === ' ') {
            res.status(404).send('Image resource not find');
        } else if (width < 10) {
            res.status(400).send("width shouldn't be less than 10");
        } else if (height < 10) {
            res.status(400).send("height shouldn't be less than 10");
        } else {
            next();
        }
    
};

export { resize, validation };
