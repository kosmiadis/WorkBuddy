import jwt from 'jsonwebtoken'
import { config } from '../../config/config'

export function validateToken ({ token }: { token: string }) {
    return jwt.verify(token, config.JWT_SECRET);
}