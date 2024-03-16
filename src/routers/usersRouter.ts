import express, { Request, Response } from "express";
import { User, UserToRegistar } from "../misc/types"

const router = express.Router();


let users: User[] = [
   { id: '1', firstName: 'firstName1', lastName: 'lastName1', email: 'email1@example.com' },
   { id: '2', firstName: 'firstName2', lastName: 'lastName2', email: 'email2@example.com' },
   { id: '3', firstName: 'firstName3', lastName: 'lastName3', email: 'email3@example.com' },
]

router.get('/', (req: Request, res: Response) => {
   res.status(200).json(users);
})

router.post('/', (req: Request, res: Response) => {
   const body: UserToRegistar = req.body
   const newUser: User = {
      // Since we don't have DB yet let ID be like this
      id: (users.length + 1).toString(),
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
   };

   if(!body.username || !body.password || !body.firstName || !body.lastName || !body.email) {
      return res.status(400).json({ message: "fill out all the fields" })
   }
   if (users.some(user => user.email === body.email)) {
      return res.status(400).json({ message: "User with this email already exists" });
   }

   users.push(newUser)
   res.status(201).json(users);
})

// update user information || muzahid
router.put('/:id', (req: Request, res: Response) => {
   const { id } = req.params;
   const updateUserInfo: User = req.body;
   try {
      const index = users.findIndex((user) => user.id === id);
      let result = {};
      if (index !== -1) {
         users[index] = { ...users[index], ... updateUserInfo };
         result = {'success': true, 'msg': 'User Info Updated Successful', data: users[index]}
      } else {
         result = {'success': false, 'msg': 'User Info not Found', data: []}
      }
      res.status(201).json(result);
   } catch (error: any) {
      res.status(500).send({'success': false, 'msg': error.message});
   }
})

export default router;