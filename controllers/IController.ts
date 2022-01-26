import {Request, Response } from 'express';

class IController {
    public getAll( req: Request, res: Response) {}

    public getOne( req: Request, res: Response){}

    public create( req: Request, res: Response){}

    public update(req: Request, res: Response){}

    public delete(req: Request, res: Response){}
}

export default IController;