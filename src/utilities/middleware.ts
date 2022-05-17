import express from 'express';
import sharp from 'sharp';

const resize = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    
        const image = req.query.name as string;
        const width = parseInt(req.query.width as string);
        const height = parseInt(req.query.height as string);

        const img_path = `./assets/images/full/${image}.jpg`;
        const resize_path = `./assets/images/output/resizedImage.jpeg`;

        await sharp(img_path).resize(width, height).toFile(resize_path);

        next();
    
};

const validation = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    const image = req.query.name as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);
    
    if (Object.keys(req.params).length === 0) {
        res.redirect('api/images');
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
