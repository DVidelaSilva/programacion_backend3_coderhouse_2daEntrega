
const validateLoginUserDto = (req, res, next) => {

    const { email, password } = req.body;
    const errors = []


    if (typeof email !== 'string' || !email.trim()) {
      errors.push({ field: 'email', message: 'El email debe ser una cadena no vacía' });
    }

    if (typeof password !== 'string' || !password.trim()) {
        errors.push({ field: 'password', message: 'El password debe ser una cadena no vacía' });
      }

    if (errors.length > 0) {
        return res.status(400).json({message: 'validation failed', errors})
    }

    next()
}

export default validateLoginUserDto