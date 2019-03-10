import Caterer from '../models/caterer.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config';

class CatererController  {
     static async registerCaterer(req, res) {
        try {
            const { username, phone, catering_company, password } = req.body;
            const hashPassword = await bcrypt.hash(password, 8);
            const caterer = await Caterer.create({username, phone, catering_company, password: hashPassword});
            const safeCat = {
                id: caterer.id,
                username: caterer.username,
                phone: caterer.phone,
                catering_company: caterer.catering_company,
            };
            const jwtToken = jwt.sign({ caterer: safeCat, isCaterer: true }, config.secret, {
                expiresIn: 86400
            });
            return res.status(201).json({
                status: "success",
                message: 'User Registered',
                token: `Bearer ${jwtToken}`,
                newCaterer: safeCat
            });
        } catch(err) {
            return res.status(500).json({
                "status": "error",
                message: err.message
            });
        }
    }

    static async loginUser(req, res) {
        try {
            const { username, password } = req.body;
            const dCaterer = await Caterer.findOne({ where: { username: username}});
            if(!dCaterer) {
                throw new Error('Caterer does not exist');
            }
            const compPassword = await bcrypt.compare(password, dCaterer.password)
            if(!compPassword) {
                throw new Error('Passwords dont match');
            }
            const safeCat = {
                id: dCaterer.id,
                username: dCaterer.username,
                phone: dCaterer.phone,
                catering_company: dCaterer.catering_company,
            };
            const jwtToken = jwt.sign({ dCaterer: safeCat, isCaterer: true }, config.secret, {
                expiresIn: 86400
            });
            return res.status(200).json({
                status: "success",
                message: "caterer Logged in",
                token: `Bearer ${jwtToken}`,
                user: safeCat
            });
        } catch (err) {
            return res.status(500).json({
                status: "error",
                message: err.message
            });
        }
    } 
}

export default CatererController;