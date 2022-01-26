import IRoutes from './IRoutes'

import { routineController } from '../controllers/routineController';

class RoutineRoutes extends IRoutes {

    constructor() {
        super()
    }

    config()  {
        this.router.route('/')
            .post(routineController.create)
            .delete(routineController.delete)
            .get(routineController.getAll);

        this.router.route('/:id')
            .put(routineController.update);

        this.router.route('/complexity/:complexity')
            .get(routineController.searchByComplexity);

        this.router.route('/days/:days')
            .get(routineController.searchByDays);

        this.router.route('/name/:name')
            .get(routineController.searchByName);

        this.router.route('/trainingType/:trainingType')
            .get(routineController.searchByTrainingType);
    }
}

const routineRoutes = new RoutineRoutes();
export default routineRoutes.router;