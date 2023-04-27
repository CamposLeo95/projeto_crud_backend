import { Router } from "express";
import HelloController from "./controllers/HelloController";
import UsersController from "./controllers/UsersController";
import RepositoriesController from "./controllers/RepositoriesController";
import SessionsController from "./controllers/SessionsController";
import auth from './middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionsController.create);

// Exemple Routes
routes.get('/hello', HelloController.index);

routes.use(auth);

//token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NGFjMTgzMmUwMzMzZGM2OGEwZTRkZiIsImlhdCI6MTY4MjYyMDgzMSwiZXhwIjoxNjgzMjI1NjMxfQ.EFfKcTb3r5vDTKPQqhr4-ERNosfm6NiWd7bnTCF7yns

// Users Routes
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.destroy);

//Repositories Routes
routes.get('/users/:user_id/repositories', RepositoriesController.index);
routes.post('/users/:user_id/repositories', RepositoriesController.create);
routes.delete('/users/:user_id/repositories', RepositoriesController.destroy);

export default routes;