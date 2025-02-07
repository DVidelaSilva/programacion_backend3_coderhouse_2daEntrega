import SessionService from "../services/sessions.service.js"

class SessionsController {

    constructor() {
        this.sessionService = new SessionService()
    }


    postRegisterUsers = async (req, res) => {
        try {  
            const {first_name, last_name, email, password} = req.body
            const userEmail = req.body.email
            const user = await this.sessionService.findExistUser(userEmail)
            if(user) {
                return res.status(400).send({status:"error",error:"Usuario ya se encuentra registrado"})
            } else {
                const users = await this.sessionService.registerUser(req.body)
                return res.status(201).send({status: 'success', message: 'Usuario creado exitosamente', data: users})
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error al crear usuario' })
        }
    }


    postSessionLogin = async (req, res) => {
        try {
            const {body} = req
            const {token, role} = await this.sessionService.loginUser(body)

            return res.status(200).send({status: 'success', message: 'Usuario Logueado Exitosamente', token: token, 'role': role})

  
        } catch (error) {
            return res.status(500).send({status: 'error', message: 'Error al loguear usuario', error: error.message})
        }
    }





}



export default SessionsController