// import { Router } from 'express';
// import bodyParser from 'body-parser';
// import User from '../models/user.model';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import config from '../config';

// const router = Router();

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

// const userController = {
//     static async registerUser(req, res) {
//         try {
//             const { name, password } = req.body;
//             const hashPassword = bcrypt.hash(password, 8);
//             const newUser = User.create({name, password: hashPassword});
//             console.log(newUser);
//             const safeUser = {
//                 id: newUser.id,
//                 name: newUser.name,
//                 password: newUser.password
//             };
//             const jwtToken = jwt.sign({ user: safeUser }, config.secret, {
//                 expiresIn: 86400
//             });
//             return res.status(201).json({
//                 status: "success",
//                 message: 'User Registered',
//                 token: `Bearer ${jwtToken}`,
//                 newUser: safeUser
//             });
//         } catch(err) {
//             return res.status(500).json({
//                 "status": "error",
//                 message: err.message
//             });
//         }
//     }
    
// }
// // router.post('/register', (req, res) => {
// //     const { name, password } = req.body;
// //     const hashPassword = bcrypt.hashSync(password, 8);
// //     const newUser = User.create({name, password: hashPassword});
// //     console.log(newUser);
// //     const safeUser = {
// //         id: newUser.id,
// //         name: newUser.name,
// //         password: newUser.password
// //     }
// //     const jwtToken = jwt.sign({ user: safeUser }, config.secret, {
// //         expiresIn: 86400
// //     });
// //     if(jwtToken)  {
// //         return res.status(201).json({
// //             status: "success",
// //             message: 'User Registered',
// //             token: `Bearer ${jwtToken}`,
// //             newUser: safeUser
// //         });
// //     } else {
// //         return res.status(500).json({
// //             status: 'error',
// //             message: err.message
// //         });
// //     }
// // });

// // router.post('/login', (req, res) => {
// //     const { name, password } = req.body;
// //     const user = User.findOne({ where: { name: name }})
// //     if(!user) {
// //         return res.status(500).json({
// //             "status": "error",
// //             "message": "No user with this Email"
// //         })
// //     }

// //     const compPassword = bcrypt.compare(password, String(user.password), (res, err) => {        
// //         if(err) {
// //             console.log(err);
// //         } else {
// //             console.log(res);
// //         }
// //     });

// //     console.log(compPassword);
    
// //     if(!compPassword) {
// //         return res.status(500).json({
// //             "status": "error",
// //             "message": "Incorrect Password"
// //         })
// //     }

// //     const safeUser = {
// //         id: user.id,
// //         name: user.name,
// //     }

// //     const jwtToken = jwt.sign({ user: safeUser}, config.secret, {
// //         expiresIn: 86400
// //     })
// //     if(safeUser) {
// //         return res.status(200).json({
// //             status: 'success',
// //             message: 'User Logged In',
// //             token: `Bearer ${jwtToken}`,
// //             user: user
// //         })
// //     } else {
// //         return res.status(500).json({
// //             status: 'error',
// //             message: err.message
// //           });
// //     }
// // })

// // export default router;
// export default userController;
