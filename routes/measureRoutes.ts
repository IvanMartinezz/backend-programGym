import IRoutes from './IRoutes';

import { measureController } from '../controllers/measureController'

class MeasureRoutes extends IRoutes {
    
    constructor() {
        super()
    }

    config() {
        // RUTAS CRUD
        this.router.route('/')
            .post(measureController.create)
            .delete(measureController.delete)
            .get(measureController.getAll);

        this.router.route('/:id')
            .put(measureController.update);
    }
}

const measureRoutes = new MeasureRoutes();
export default measureRoutes.router;