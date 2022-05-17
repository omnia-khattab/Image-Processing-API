//import images from './api/images';
//const resize_path = `./assets/images/output/resizedImage.jpg`;

import express from 'express';
import { resize, validation } from './../utilities/middleware';
import images from './api/images';
const routes = express.Router();

routes.use('/api/images', validation, resize, images);

routes.get('/', (req: express.Request, res: express.Response) => {
    res.send('HEllo From Main Route');
});
export default routes;


