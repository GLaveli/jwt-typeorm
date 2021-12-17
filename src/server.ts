import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json';

import { routes } from './routes';

import './database';

config();

const PORT = process.env.API_PORT || 3333;

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);

app.listen(PORT, () => {
 console.log(`Server started at port: ${PORT}`);
});