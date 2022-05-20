import express from 'express';
import sharp from 'sharp';
import { promises as fsPromises } from 'fs';
import { existsSync } from 'node:fs';
import path, { resolve } from 'path';
import { Stats } from 'fs';
import { rejects } from 'assert';

const resizeMiddleware = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void | null> => {
    const image: string = req.query.name as string;
    const width: number = parseInt(req.query.width as string);
    const height: number = parseInt(req.query.height as string);

    const resize_path: string = path.resolve(
        __dirname,
        `./../../assets/images/output/${image}_${width}_${height}.jpeg`
    );

    //chech if there's an exact image with the same properties
    if (existsSync(resize_path)) {
        const img = await fsPromises.readFile(resize_path).catch(() => {
            res.status(500).send(
                'Error occured while processing the image from middleware function'
            );
            return;
        });
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(img, 'binary');
        return;
    } else {
        try {
            await resize(image, width, height);
            next();
        } catch (error) {
            res.status(500).send(error + 'From try & catch in Middleware');
        }
    }
};

const resize = async(image: string, width: number, height: number):Promise<void> => {
    const img_path: string = path.resolve(
        __dirname,
        `./../../assets/images/full/${image}.jpg`
    );
    const resize_path: string = path.resolve(
        __dirname,
        `./../../assets/images/output/${image}_${width}_${height}.jpeg`
    );

    await sharp(img_path)
        .resize(width, height)
        .toFile(resize_path)
        .then((res) => {
            console.log('Done!', res);
            resolve(resize_path);
        })
        .catch((err) => {
            console.error("Error processing files, let's clean it up", err);
            rejects(err);
        });
};

const validation = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void | null> => {
    const image: string = req.query.name as string;
    const width: number = parseInt(req.query.width as string);
    const height: number = parseInt(req.query.height as string);

    //checking if the image exist in the folder
    const dir_path = path.resolve(
        __dirname,
        `../../assets/images/full/${image}.jpg`
    );
    const imageNameExist: Stats | null = await fsPromises
        .stat(dir_path)
        .catch(() => {
            //res.status(404).send('Image resource not found');
            return null;
        });

    if (Object.keys(req.query).length === 0) {
        res.send('');
        return;
    } else if (image === undefined || image === ' ' || !imageNameExist) {
        res.status(404).send('Image resource not found');
        return;
    } else if (width < 10 || isNaN(width)) {
        res.status(400).send('width must be exist and more than 10');
        return;
    } else if (height < 10 || isNaN(height)) {
        res.status(400).send('height must be exist and more than 10');
        return;
    } else {
        next();
    }
};

export { resizeMiddleware, resize, validation };
