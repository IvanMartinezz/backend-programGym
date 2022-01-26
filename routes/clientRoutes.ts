import IRoutes from './IRoutes';

import { clientController } from '../controllers/clientController';

class ClientRoutes extends IRoutes {
    
    constructor() {
        super()
    }

    config() {
        // RUTAS CRUD
        this.router.route('/')
            .delete(clientController.delete)
            .get(clientController.getAll)
            .post(clientController.create);
            
        this.router.route('/document/:document')
            .get(clientController.searchByDocument)    

        this.router.route('/name/:name')
            .get(clientController.searchByName);
        
        this.router.route('/sex/:sex')
            .get(clientController.searchBySex);
        
        this.router.route('/:id')
            .get(clientController.getOne)
            .put(clientController.update);
    }
}

const clientRoutes = new ClientRoutes();
export default clientRoutes.router;