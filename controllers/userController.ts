import {Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import config from '../config/config';

import pool from '../database';

import IController from './IController';

class UserController extends IController {
    
    async create (req: Request, res: Response): Promise<void> {
        try {     
            const {username, fullname, email, password} = req.body;
            
            const sql = `INSERT INTO user(username, fullname, email, password) VALUES ('${username}', '${fullname}', '${email}', '${password}')`;
            await pool.query(sql, (err: Error, result: any) => {
               console.log(result);
                if(typeof result === "undefined") {
                    res.status(404).send(`No se pudo crear el usuario. ${err}`);
                }else {
                    res.status(200).send(`Usuario creado `);
                }
            }) 
        } catch (err) {
            console.log(err)       
        }
    }
    
        // PRUEBAS, NO VA!

    async getAll (req: Request, res: Response ): Promise<void> {
            const users = await pool.query('SELECT * FROM user');
            res.json(users);
        }

    async updatePassword(req: Request, res: Response) {
        try {
            const {id, password} = req.body
            const sql = `UPDATE user SET password = '${password}' WHERE id = '${id}' `;
            await pool.query(sql, (err: Error, result: any) => {
                if(result.affectedRows !== 0){
                    res.status(200).send(`Contraseña modificada `);
                }else{
                    res.status(403).send(`No se pudo modificar la contraseña `);
                }
            })
        } catch (err) {
            res.status(404).json(err);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const {id}= req.body;
            const sql = `DELETE FROM user WHERE id = '${id}' `;
            await pool.query(sql, (err: Error, result: any) => {
                console.log(result);
                if(result.affectedRows !== 0) {
                    res.status(200).send(`Usuario borrado! `);
                }else {
                    res.status(404).send(`No se pudo borrar el usuario.`);
                }
            })
        }catch(err){
                console.log(err);
            }
    }

    async login(req: Request, res: Response) {
        try {
            const {email, password} = req.body;
            const sql = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}' ` ;
            await pool.query(sql, (err: Error, result: any) => {
                if(result.length > 0){
                    const {id, username} = result[0];
                    const user_id = id;
                    const token = jwt.sign({user_id, username}, config.jwtSecret, {expiresIn: '20h'})
                    console.log(token)
                    res.status(200).json({message:'OK', token});
                }else {
                    res.status(400).send(`email o password incorrecto!` );
                }
            })
        } catch (e) {
            console.log(e);
        }
        }

        // async login(req: Request, res: Response) {
        //     try {
        //         const email: string = req.body.email;
        //         const password: string = req.body.password;
        //         const sql = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}' ` ;
        //         await pool.query(sql, (err: Error, result: any) => {
        //             if(result.length > 0){
        //                 res.status(200).send(result[0]);
        //                  const user = result[0];
        //                 // console.log(user);
        //                  const token = jwt.sign({user}, 'secretKey');
                        

        //                 // ls('secretKey',token);
        //                 // ls.get<string>('secretKey',token);
        //                 // console.log(token);
        //                 // res.json({
        //                 //     token
        //                 // });

                        
        //             }else {
        //                 res.status(404).send(`email o password incorrecto! `);
        //             }
        //         })
        //     } catch (e) {
        //         console.log(e);
        //     }
        //     }

};

export const userController = new UserController();