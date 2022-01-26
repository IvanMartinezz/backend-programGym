import IController from './IController';

import {Request, Response} from 'express';

import pool from '../database'; 

class ClientController extends IController {

    async create(req: Request, res: Response){
        try {
            const {name, surname, document, phone, email, sex, profile_id} = req.body;
            const sql = `INSERT INTO client (name, surname, document, phone, email, sex, profile_id) VALUES ('${name}', '${surname}', '${document}', '${phone}', '${email}', '${sex}', '${profile_id}') `;
            await pool.query(sql, (err: Error, result: any) => {
                console.log(result)
                if(typeof result === "undefined") {
                    res.status(404).send(`No se pudo crear el cliente.`);
                }else {
                    result;
                    res.status(200).send(`Cliente creado`);
                }
            })
        } catch (e) {
            console.log(e);    
        }
    }

    async update(req: Request, res: Response){
        try {
            const id: number = parseInt(req.params.id);
            const {name, surname, document, phone, email, sex }  = req.body;
            const updateClient = await pool.query(`UPDATE client SET name = '${name}', surname = '${surname}', document = '${document}', phone = '${phone}', email= '${email}', sex = '${sex}' WHERE id = '${id}' `);
            console.log(updateClient)
            if( updateClient.affectedRows && updateClient.changedRows > 0) {
                res.status(200).json({message: "El cliente fue actualizado"});
            }else {
                res.status(404).json({message: "El cliente no pudo ser actualizado"});
            }
        } catch (e) {
            console.log(e);
        }
    }

    async delete(req: Request, res: Response){
        try {
            const {id} = req.body;
            const sql = `DELETE FROM client WHERE id = '${id}' `;
            await pool.query(sql, (err: Error, result: any) => {
                console.log(result);
                if(result.affectedRows !== 0) {
                    res.status(200).send(`Cliente borrado! `);
                }else {
                    res.status(404).send(`No se pudo borrar el cliente.`);
                }
            })
        }catch(err){
                console.log(err);
            }
    }


    async getAll(req: Request, res: Response){
        try {
            const clients = await pool.query(`SELECT * FROM client`);
            res.json(clients); 
        } catch (e) {
            console.log(e);
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const id: number = parseInt(req.params.id);
            const sql = `SELECT * FROM client WHERE id = '${id}' `;
            await pool.query(sql, (err: Error, result: any) =>{
                console.log(result);
                    if (result.length > 0) {
                        res.json(result[0]);
                    }else {
                        res.json({message: "El cliente no existe"});
                    }
                })
            
        } catch (e) {
            console.log(e);
        }
    }

    async searchByName(req: Request, res: Response){
        try {
            const name: string = req.params.name;
            const sql = `SELECT * FROM client WHERE name = '${name}' `;
            await pool.query(sql, (err: Error, result: any) => {
                console.log(result[0]);
                 if(result[0]){
                    res.status(200).json(result);
                 } else{
                     res.status(404).send(`No se encontró el cliente`);
                 }
            })

        } catch (e) {
            console.log(e);
        }
    }

    async searchByDocument(req: Request, res: Response){
        try {
            const document: string = req.params.document;
            const sql = `SELECT * FROM client WHERE document = '${document}' `;
            await pool.query(sql, (err: Error, result: any) => {
                console.log(result[0]);
                 if(result[0]){
                    res.status(200).json(result);
                 } else{
                     res.status(404).send(`No se encontró el cliente`);
                 }
            })

        } catch (e) {
            console.log(e);
        }
    }

    async searchBySex(req: Request, res: Response){
        try {
            const sex: string = req.params.sex;
            const sql = `SELECT * FROM client WHERE sex = '${sex}' `;
            await pool.query(sql, (err: Error, result: any) => {
                console.log(result);
                 if(result[0]){
                    res.status(200).json(result);
                 } else{
                     res.status(404).send(`No se encontró el cliente`);
                 }
            })

        } catch (e) {
            console.log(e);
        }
    }
}

export const clientController = new ClientController();
