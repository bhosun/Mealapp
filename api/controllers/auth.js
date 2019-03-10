import jwt from 'jsonwebtoken';
import config from '../config';

class AuthController {
    static async decodeToken(req) {
        try {
            const token = req.headers['authorization'];
            if(!token) {
                throw new Error('Token not Provided');
            }
            const jwtToken = token;
            const decoded = await jwt.verify(jwtToken, config.secret);
            return decoded;
        } catch(err) {
            throw new Error(err);
        }
    }

    static async verifyUser(req, res, next){
        try {
            const decoded = await AuthController.decodeToken(req);
            req.user = decoded.user;
            next();
            return true;
        } catch(err) {
            return res.status(500).json({
                status: "error",
                message: err.message
            });
        }
    }

    static async verifyOga(req, res, next) {
        try {
            const decoded = await AuthController.decodeToken(req);
            if(!decoded.isCaterer) {
                throw new Error("not authorized!");
            } 
            req.caterer = decoded.caterer;
            next();
            return true;
        } catch(err) {
            return res.status(500).json({
                status: "error",
                message: err.message
            });
        }
    }
}

export default AuthController;