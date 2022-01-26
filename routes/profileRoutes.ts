import IRoutes from './IRoutes';

import { profileController } from '../controllers/profileController'

class ProfileRoutes extends IRoutes {
    
    constructor() {
        super()
    }

    config() {
        // RUTAS CRUD
        this.router.route('/')
            .post(profileController.create)
            .delete(profileController.delete)
            // .get(profileController.getAll);

        this.router.route('/')
            // .get(profileController.getProfile);
        
        this.router.route('/:user_id/:id')
            .get(profileController.getOneProfile);
        
        this.router.route('/:user_id')
            .get(profileController.getOneUser)
            .post(profileController.changeName);
    }
}

const profileRoutes = new ProfileRoutes();
export default profileRoutes.router;