const {Router} = require('express')
const Users = require('../models/user.model')
const adminUsers = require('../configs/admin-users')

const router = Router()



const url = `/products`

// ENDPOINT PARA EL LOGIN

router.post('/', async (req, res) => {
    try {
        
        const { email, password } = req.body

        let user
    
        user = await Users.findOne({ email })
    
        if (email === adminUsers.email && password === adminUsers.password) {
            user = adminUsers
            req.session.user = adminUsers
            return res.json({status: 'Success', message: 'Login Succesfull', url })
        }

        if (!user) return res.status(400).json({message: 'Bad request'})
    

        if (user.password !== password) {
            return res.status(400).json({ message: 'Bad request' })
        }


            req.session.user = {
                logged: true,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
            }

        res.json({status: 'Success', message: 'Login Succesfull', url })

    } catch (error) {
        console.log(error)
        res.status(500).json({status: 'Error', message: 'Internal Server Error'})
    }

})



module.exports = router