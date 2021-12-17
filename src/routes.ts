import Router from 'express';

import { ServerstatusController } from './controllers/ServerStatusController';
import { CreateUserController } from './controllers/CreateUserController';
import { SessionsController } from './controllers/SessionController';
import { ShowUserController } from './controllers/ShowUserController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const routes = Router();

routes.get('/', new ServerstatusController().show);

routes.post('/user', new CreateUserController().handle);
routes.post('/login', new SessionsController().handle);
//User routes
routes.post('/getuser', ensureAuthenticated(), new ShowUserController().showOne);
routes.get('/getuser', ensureAuthenticated(), new ShowUserController().showAll);

export { routes };