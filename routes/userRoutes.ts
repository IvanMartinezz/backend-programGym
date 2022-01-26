import IRoutes from './IRoutes'

import { userController } from '../controllers/userController'

class UserRoutes extends IRoutes {

    constructor() {
        super()
    }

    config()  {
        // RUTAS DE LOGEO Y CREACION  

        // this.router.post('/signup', userController.signup);
        this.router.post('/login', userController.login);
        
        // RUTAS CRUD
         this.router.route('/')
            .post(userController.create)
            .delete(userController.delete)
            .get(userController.getAll);
            
        this.router.route('/:id')
            .post(userController.updatePassword);
    };
};

const userRoutes = new UserRoutes();
export default userRoutes.router;
 