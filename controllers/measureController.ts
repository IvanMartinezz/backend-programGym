import { Request, Response } from 'express';
import pool from '../database';

import IController from './IController';

class MeasureController extends IController {
    async create(req: Request, res: Response){
        try {

            const {id, date, age, height, weight, shoulders, chest, waist, biceps, leg, client_id} = req.body;
            const sql = `INSERT INTO measure (id, date, age, height, weight, shoulders, chest, waist, biceps, leg, client_id)
                 VALUES ('${id}', '${date}', '${age}', '${height}', '${weight}', '${shoulders}', '${chest}', '${waist}', '${biceps}', '${leg}', '${client_id}')` ;
            await pool.query(sql, (err: Error, result: any) => {
                console.log(result);
                if(typeof result === "undefined") {
                    res.status(404).send(`No se pudieron crear las medidas.`);
                }else{
                    res.status(200).send(`Medidas creadas!`);
                }
            })
        } catch (e) {
            console.log(e);
        }

    }

    async delete(req: Request, res: Response){
        try {
            const {id} = req.body;
            const sql = `DELETE FROM measure WHERE id = '${id}' `;
            await pool.query(sql, (err: Error, result: any) => {
                console.log(result);
                if(result.affectedRows !== 0) {
                    res.status(200).send(`Medidas borradas! `);
                }else {
                    res.status(404).send(`No se pudo borrar.`);
                }
            })
        }catch(err){
                console.log(err);
            }
    }

    async update(req: Request, res: Response){
        try {
            const id: number = parseInt(req.params.id);
            const {date, age, height, weight, shoulders, chest, waist, biceps, leg} = req.body;
            const sql = `UPDATE routine SET date = '${date}', age = '${age}', height = '${height}', weight = '${weight}', 
                shoulders= '${shoulders}' , chest= '${chest}' , waist= '${waist}' , biceps= '${biceps}' , leg= '${leg}' WHERE id = '${id}' `;
            await pool.query(sql, (err: Error, result: any)=> {
                console.log(result);
                if( result.affectedRows && result.changedRows > 0) {
                    res.status(200).json({message: "Las medidas fueron actualizadas"});
                }else {
                    res.status(404).json({message: "Las medidas no se pudieron actualizar"});
                }
            })  
        } catch (e) {
            console.log(e);
        }

    }

    async getAll(req: Request, res: Response){
        try {
            const measures = await pool.query(`SELECT * FROM measure`);
            res.json(measures); 
        } catch (e) {
            console.log(e);
        }
    }

}export const measureController = new MeasureController();