import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerExpress from 'swagger-ui-express';
import yamljs from 'yamljs';
import routes from './routes/index';
import error from './middlewares/expressErrorMiddleware';

const app = express();
const documentation = yamljs.load(`${process.cwd()}/server/swagger.yaml`);
app.use('/api-docs', swaggerExpress.serve, swaggerExpress.setup(documentation));

const apiPath = '/api/v1';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(apiPath, routes.users);
app.use(apiPath, routes.menu);
app.use(apiPath, routes.orders);
app.use(error);

const port = process.env.PORT || 8000;

app.listen(port);


export default app;
