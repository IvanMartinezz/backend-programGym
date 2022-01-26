import IRoutes  from './IRoutes'

import {indexController} from '../controllers/indexController';

class IndexRoutes extends IRoutes {

    constructor() {
        super()
    }

    config()  {
        this.router.get('/get', indexController.index);
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;