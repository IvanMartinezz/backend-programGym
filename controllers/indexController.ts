import {Request, Response } from 'express';

import pool from '../database';

import IController from './IController'


class IndexController extends IController {
    
    index(req: Request, res: Response){
        pool.query('SELECT * FROM users');
        res.json('users');
    }
}

export const indexController = new IndexController();