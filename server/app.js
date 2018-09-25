import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes/index';


const app = express();
const apiPath = '/api/v1';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(apiPath, routes.users);
app.use(apiPath, routes.menu);


const port = process.env.PORT || 8000;

app.listen(port);


export default app;
