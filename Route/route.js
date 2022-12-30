import express from 'express'
import { login, signup, getUser, refreshToken } from '../controller/user-controller.js'


const router = express.Router()
    // router.post('/',addUser)
    // router.get('/',getUser)
    // router.delete('/:id',deleteUser)
    router.get('/:id',getUser)
    // router.put('/:id',editUser)
    router.post('/login', login )
    router.post('/signup', signup )
    router.post('/refresh', refreshToken)
  
export default router