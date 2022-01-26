import express, {Application} from 'express';

import cors from 'cors';
import morgan from 'morgan';

import clientRoutes from './routes/clientRoutes';
import exerciseRoutes from './routes/exerciseRoutes';
import indexRoutes from './routes/indexRoutes';
import measureRoutes from './routes/measureRoutes';
import profileRoutes from './routes/profileRoutes';
import routineRoutes from './routes/routineRoutes';
import userRoutes from './routes/userRoutes'

// npm i @types/body-parser -D agregar un modulo 

class App {
    private app: Application;
    
    constructor() {
        this.app = express();
        this.settings();
        this.middleware();
        this.routes();
    }

    private settings(){
        this.app.set('port', process.env.PORT || 3000);
    }

    private middleware() : void {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        
        this.app.use(function(req, res, next) {
            res.setHeader("Content-Type", "application/json");
            next();
        });
    }

    private routes() : void {
        this.app.use(indexRoutes);
        this.app.use('/client', clientRoutes);
        this.app.use('/exercise', exerciseRoutes);
        this.app.use('/measure', measureRoutes);
        this.app.use('/profile', profileRoutes);
        this.app.use('/routine', routineRoutes);
        this.app.use('/user', userRoutes);

    }

    async start() : Promise<void> {
        await this.app.listen(this.app.get('port'), () => {
            console.log(`server on port ${this.app.get('port')}`)
        });
    }
};

export default App;