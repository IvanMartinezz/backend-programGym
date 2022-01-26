import {Request, Response } from 'express';
import pool from '../database';

import IController from './IController';

class ProfileController extends IController {
    
    async create( req: Request, res: Response){
        try {
            const {name, user_id} = req.body;
    
            const sql = `INSERT INTO profile (name, user_id) VALUES ('${name}', '${user_id}')`;
            await pool.query(sql, (err: Error, result: any) => {
                console.log(result)
                if(typeof result === "undefined") {
                    res.status(404).send(`No se pudo crear el perfil.` );
                }else {
                    res.status(200).send(`Perfil creado!`);
                }
            })
        } catch (e) {
            console.log(e);
        }
        };

    // async getAll( req: Request, res: Response) {
    //     const profiles = await pool.query('SELECT * FROM profile');
    //     res.json(profiles);
    // };

    async getOneProfile(req: Request, res: Response){
        try {
            const {id, user_id} = req.params;
            // const sql = `SELECT * FROM profile WHERE id = ${id}`;
            const sql = `SELECT * FROM profile WHERE user_id = '${user_id}' AND id = '${id}'`;
            await pool.query(sql, (err: Error, result: any) => {
                if(!result){
                    res.status(400).send({message: 'No se encontró el perfil'});
                } else {
                    console.log(result);
                    res.status(200).json(result);
                }
            })
        } catch (e) {
            console.log(e);
        }
    }

    async getOneUser(req: Request, res: Response){
        try {
            const user_id = req.params.user_id;
            const sql = `SELECT * FROM profile WHERE user_id = '${user_id}' `;
            await pool.query(sql, (err: Error, result: any) => {
                if(!result){
                    res.status(400).send({message: 'No se encontró el usuario'})
                }else{
                    console.log(result);
                    res.status(200).json(result);
                }
            })
        } catch (e) {
            console.log(e);
        }
    }
   
        async changeName(req: Request, res: Response) {
            try {
                const id: number  = parseInt(req.params.id);
                const {name} = req.body;
                const sql = `UPDATE profile SET name = '${name}' WHERE id = '${id}' `;
                await pool.query(sql, (err: Error, result: any) => {
                    if(result.affectedRows !== 0){
                        res.status(200).send(`Nombre cambiado `);
                    }else{
                        res.status(404).send(`No se pudo cambiar el nombre `);
                    }
                })
            } catch (err) {
                res.status(404).json(err);
            }
        }

        async delete(req: Request, res: Response) {
            try {
                const {id} = req.body;
                const sql = `DELETE FROM profile WHERE id = '${id}' `;
                await pool.query(sql, (err: Error, result: any) => {
                    console.log(result);
                    if(result.affectedRows !== 0) {
                        res.status(200).send(`Perfil borrado! `);
                    }else {
                        res.status(404).send(`No se pudo borrar el perfil.`);
                    }
                })
            }catch(err){
                    console.log(err);
                }
        }};
        
export const profileController = new ProfileController();