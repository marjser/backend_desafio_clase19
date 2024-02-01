const {Router} = require('express')
const Users = require('../models/user.model')
const adminUsers = require('../configs/admin-users')

const router = Router()

// ENDPOINT PARA CREAR USUARIO

router.post('/', async (req, res) => {
    try {
        
        const { first_name, last_name, age, email, password } = req.body

        if (email === adminUsers.email) {
            return res.status(400).json({status: 'Error', message: 'Bad request'})

        }

        const newUserInfo = {
            first_name,
            last_name,
            age,
            email,
            password
        }

        
        const user = await Users.create(newUserInfo)

        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
        }
        
        const url = '/products'

        res.json({status: 'Success', message: user, url})

    } catch (error) {
        console.log(error)
        res.status(500).json({status: 'Error', message: 'Internal Server Error'})
    }

})


module.exports = router