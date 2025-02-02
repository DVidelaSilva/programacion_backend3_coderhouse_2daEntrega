
const validateUpdateUserDto = (req, res, next) => {

    const { first_name, last_name, email, password } = req.body;
    const errors = []

    if( first_name !== undefined && (typeof first_name !== 'string' || !first_name.trim())) {
        errors.push({fields: 'first_name', message: 'El first_name debe ser una cadena no vacia'})
    }
    if ( last_name !== undefined && (typeof last_name !== 'string' || !last_name.trim())) {
        errors.push({ field: 'last_name', message: 'El last_name debe ser una cadena no vacía' });
      }

    if ( email !== undefined && (typeof email !== 'string' || !email.trim())) {
      errors.push({ field: 'email', message: 'El email debe ser una cadena no vacía' });
    }

    if ( password !== undefined && (typeof password !== 'string' || !password.trim())) {
        errors.push({ field: 'password', message: 'El password debe ser una cadena no vacía' });
      }

    if (errors.length > 0) {
        return res.status(400).json({message: 'validation failed', errors})
    }

    next()
}

export default validateUpdateUserDto