import IController from './IController';

import { Request, Response } from 'express';

import pool from '../database';

class ExerciseController extends IController {

    async create(req: Request, res: Response){
        try {
            const {id, name, element, serie, repetition, kilogram, breakk, routine_id} = req.body;
            const sql = `INSERT INTO exercise (id, name, element, serie, repetition, kilogram, break, routine_id) 
                VALUES ('${id}', '${name}', '${element}', '${serie}', '${repetition}', '${kilogram}', '${breakk}', '${routine_id}') `;
            await pool.query(sql, (err: Error, result: any) => {
                console.log(result)
                 if(typeof result === "undefined") {
                     res.status(404).send(`No se pudo crear el ejercicio.`);
                }else {
                    res.status(200).send(`Ejercicio creado`);
                }
        })  
        } catch (e) {
            console.log(e);    
        }
    }
    
    async delete(req: Request, res: Response){
        try {
            const {id} = req.body;
            const sql = `DELETE FROM exercise WHERE id = '${id}' `;
            await pool.query(sql, (err: Error, result: any) => {
                console.log(result);
                if(result.affectedRows !== 0) {
                    res.status(200).send(`Ejercicio borrado! `);
                }else {
                    res.status(404).send(`No se pudo borrar el ejercicio.`);
                }
            })
        }catch(err){
                console.log(err);
            }
    }

    async getAll(req: Request, res: Response){
        try {
            const exercises = await pool.query(`SELECT * FROM exercise`);
            res.json(exercises); 
        } catch (e) {
            console.log(e);
        }
    }

    async searchByName(req: Request, res: Response){
        try {
            const name = req.params.name;
            const sql = `SELECT * FROM exercise WHERE name = '${name}' `;
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
    
    async searchByElement(req: Request, res: Response){
        try {
            const element = req.params.element;
            const sql = `SELECT * FROM exercise WHERE element = '${element}' `;
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

    async update(req: Request, res: Response){
        try {
            const id: number = parseInt(req.params.id);
            const {name, element, serie, repetition, kilogram, breakk} = req.body;
            const sql = `UPDATE exercise SET name = '${name}', element = '${element}', serie = '${serie}', repetition = '${repetition}', kilogram= '${kilogram}', break= '${breakk}' WHERE id = '${id}' `;
            await pool.query(sql, (err: Error, result: any)=> {
                console.log(result);
                if( result.affectedRows && result.changedRows > 0) {
                    res.status(200).json({message: "El ejercicio fue actualizado"});
                }else {
                    res.status(404).json({message: "El ejercicio no pudo ser actualizado"});
                }
            })  
        } catch (e) {
            console.log(e);
        }
    }
}

export const exerciseController = new ExerciseController();