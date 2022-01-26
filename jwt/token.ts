import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers['auth'];
    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (e) {
        return res.status(401).json({ message: 'Not Autorized'});
    }
    
    const {userId, username} = jwtPayload;

    const newToken = jwt.sign({userId, username}, config.jwtSecret, {expiresIn: '20h'});
    res.setHeader('token', newToken);
    next();
};


                    // const {id, username} = result[0];
                    // const user_id = id;
                    // const token = jwt.sign({user_id, username}, config.jwtSecret, {expiresIn: '20h'})
                    //  console.log(token, user_id)
                    // res.status(200).json({message:'OK', token, user_id});