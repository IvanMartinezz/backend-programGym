import IController from './IController';

import {Request, Response} from 'express';

import pool from '../database';

class RoutineController extends IController {

    // getOne(req: Request, res: Response){}

    async create(req: Request, res: Response){
        try {
            const {name, trainingType, days, complexity, date, client_id } = req.body;
            const sql = `INSERT INTO routine (name, trainingType, days, complexity, date, client_id) VALUES ('${name}', '${trainingType}', '${days}', '${complexity}', '${date}', '${client_id}') `;
            await pool.query(sql, (err: Error, result: any) => {
                console.log(result)
                // if(result) {
                 if(typeof result === "undefined") {
                     res.status(404).send(`No se pudo crear la rutina.`);
                }else {
                    res.status(200).send(`Rutina creada `);
                }}) 
        } catch (e) {
            console.log(e);    
        }
    }

    async delete(req: Request, res: Response){
        try {
            const {id} = req.body;
            const sql = `DELETE FROM routine WHERE id = '${id}' `;
            await pool.query(sql, (err: Error, result: any) => {
                console.log(result);
                if(result.affectedRows !== 0) {
                    res.status(200).send(`Rutina borrada! `);
                }else {
                    res.status(404).send(`No se pudo borrar la rutina.`);
                }
            })
        }catch(err){
                console.log(err);
            }
    }

    async getAll(req: Request, res: Response){
        try {
            const routines = await pool.query(`SELECT * FROM routine`);
            res.json(routines); 
        } catch (e) {
            console.log(e);
        }
    }

    async searchByName(req: Request, res: Response) {
        try {
            const name = req.params.name;
            const sql = `SELECT * FROM routine WHERE name = '${name}' `;
            await pool.query(sql, (err: Error, result: any)=> {
                console.log(result);
                if(result[0]){
                    res.status(200).send(result);
                }else {
                    res.status(404).send(`No se encontró la rutina`);
                }
            } )
        } catch (e) {
            console.log(e);
        }
    }

    async searchByTrainingType(req: Request, res: Response) {
        try {
            const trainingType = req.params.trainingType;
            const sql = `SELECT * FROM routine WHERE trainingType = '${trainingType}' `;
            await pool.query(sql, (err: Error, result: any)=> {
            console.log(result);
            if(result[0]){
                res.status(200).send(result);
            }else{
                res.status(404).send(`No se encontró la rutina`);
            }
        })
        } catch (e) {
            console.log(e);
        }
    }

    async searchByDays(req: Request, res: Response) {
        try {
            const days = req.params.days;
            const sql = `SELECT * FROM routine WHERE days = '${days}' `;
            await pool.query(sql, (err: Error, result: any)=> {
            console.log(result);
            if(result[0]){
                res.status(200).send(result);
            }else{
                res.status(404).send(`No se encontró la rutina`);
            }
        })
        } catch (e) {
            console.log(e);
        }
    }

    async searchByComplexity(req: Request, res: Response){
        try {
            const complexity = req.params.complexity;
            const sql = `SELECT * FROM routine WHERE complexity = '${complexity}' `;
            await pool.query(sql, (err: Error, result: any)=> {
            console.log(result);
            if(result[0]){
                res.status(200).send(result);
            }else{
                res.status(404).send(`No se encontró la rutina`);
            }
        })
        } catch (e) {
            console.log(e);
        }       
    }

    async update(req: Request, res: Response){
        try {
            const id: number = parseInt(req.params.id);
            const {name, trainingType, days, complexity, date} = req.body;
            const sql = `UPDATE routine SET name = '${name}', trainingType = '${trainingType}', days = '${days}', complexity = '${complexity}', date= '${date}' WHERE id = '${id}' `;
            await pool.query(sql, (err: Error, result: any)=> {
                console.log(result);
                if( result.affectedRows && result.changedRows > 0) {
                    res.status(200).json({message: "La rutina fue actualizada"});
                }else {
                    res.status(404).json({message: "La rutina no pudo ser actualizada"});
                }
            })  
        } catch (e) {
            console.log(e);
        }
    }
}

export const routineController = new RoutineController();
