import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes/index';
import error from './middlewares/expressErrorMiddleware';

const app = express();
const apiPath = '/api/v1';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(apiPath, routes.createTablesLocally);
app.use(apiPath, routes.foodItem);
app.use(apiPath, routes.myOrder);
app.use(error);

const port = process.env.PORT || 8000;

app.listen(port);


export default app;
