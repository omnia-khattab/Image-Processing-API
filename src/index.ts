import express from 'express';
import routes from './routes/indexRoute';

const app = express();
const port = 3000;

app.use(routes);

app.listen(port, () => {
    console.log(`app start listening at port: ${port}`);
});

export default app;
