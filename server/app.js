import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index';
import error from './middlewares/expressErrorMiddleware';
import apiNotFound from './middlewares/expressNotFoundMiddleware';


const app = express();

app.use(cors());
const apiPath = '/api/v1';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(apiPath, routes.users);
app.use(apiPath, routes.menu);
app.use(apiPath, routes.orders);
app.use(apiNotFound);
app.use(error);

const port = process.env.PORT || 8000;

app.listen(port);


export default app;
