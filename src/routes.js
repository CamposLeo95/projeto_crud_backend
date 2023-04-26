import { Router } from "express";
import HelloController from "./controllers/HelloController";
import UsersController from "./controllers/UsersController";
import RepositoriesController from "./controllers/RepositoriesController";

const routes = new Router();

// Exemple Routes
routes.get('/hello', HelloController.index);

// Users Routes
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.destroy);

//Repositories Routes
routes.get('users/:user_id/repositories', RepositoriesController.index);
routes.post('users/:user_id/repositories', RepositoriesController.create);

export default routes;