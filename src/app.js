import express from "express";
import cors from "cors";
import routes from './routes'

import './database'

class App {

    constructor(){
        //o this.server = express() é o mesmo que const app = express()
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(express.json());
        this.server.use(cors());
    }

    routes(){  
        this.server.use(routes);
    }
}
// aqui é como se estivessemos importando o metodo app
export default new App().server;