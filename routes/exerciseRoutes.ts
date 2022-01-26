import IRoutes  from './IRoutes'

import {exerciseController} from '../controllers/exerciseController';

class ExerciseRoutes extends IRoutes {

    constructor() {
        super()
    }

    config()  {
        this.router.route('/')
            .post(exerciseController.create)
            .delete(exerciseController.delete)
            .get(exerciseController.getAll);
            
        this.router.route('/:id')  
           .put(exerciseController.update);

        this.router.route('/searchByName/:name')
            .get(exerciseController.searchByName);
        
        this.router.route('/searchByElement/:element')
            .get(exerciseController.searchByElement);
    }
}

const exerciseRoutes = new ExerciseRoutes();
export default exerciseRoutes.router;