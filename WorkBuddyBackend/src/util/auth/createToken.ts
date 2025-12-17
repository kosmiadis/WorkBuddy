import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

export function createToken ({ id, email }: { id: string, email: string}) {        
    /*
        Payload: {
            id    
            email,
        }
    */
    return jwt.sign({ _id: id, email }, config.JWT_SECRET, {
        expiresIn: '1h'
    })
}