import { Router } from 'express'

abstract class IRoutes {
    public router:Router = Router();

    constructor() {
        this.config();
    }

    config(): void  {
    }
}

export default IRoutes;