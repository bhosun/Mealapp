import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config';

class UserController  {
     static async registerUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const hashPassword = await bcrypt.hash(password, 8);
            const user = await User.findOne({ where: { name: name}});
            const emailini = await User.findOne({ where: { email: email}});
            const newUser = await User.create({name, email, password: hashPassword});

            if(user || emailini) {
                throw new Error('User Already exists with same name or email bruh');
            }

            const safeUser = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            };
            const jwtToken = jwt.sign({ user: safeUser }, 'jembe', {
                expiresIn: 86400
            });
            return res.status(201).json({
                status: "success",
                message: 'User Registered',
                token: `Bearer ${jwtToken}`,
                newUser: safeUser
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
            const {name, password} = req.body;
            const user = await User.findOne({ where: { name: name}});
            if(!user) {
                throw new Error('User does not exist');
            }
            const compPassword = await bcrypt.compare(password, user.password)
            if(!compPassword) {
                throw new Error('Passwords dont match');
            }
            const safeUser = {
                id: user.id,
                name: user.name
            };
            const jwtToken = jwt.sign({ user: safeUser }, 'jembe', {
                expiresIn: 86400
            });
            return res.status(200).json({
                status: "success",
                message: "user Logged in",
                token: jwtToken,
                user: safeUser
            });
        } catch (err) {
            return res.status(500).json({
                status: "error",
                message: err.message
            });
        }
    } 
}

export default UserController;