
const validateUpdatePetDto = (req, res, next) => {

  const {name, type, age_months, age_years} = req.body
    const errors = []

    if( name !== undefined && (typeof name !== 'string' || !name.trim())) {
        errors.push({fields: 'name', message: 'El name debe ser una cadena no vacia'})
    }
    if ( type !== undefined && (typeof type !== 'string' || !type.trim())) {
        errors.push({ field: 'type', message: 'El type debe ser una cadena no vacía' });
      }

    if ( age_months !== undefined && (typeof age_months !== 'number' || age_months < 0 || !Number.isFinite(age_months))) {
      errors.push({ field: 'age_months', message: 'El age_months debe ser una cadena no vacía' });
    }

    if ( age_years !== undefined && (typeof age_years !== 'number' || age_years < 0 || !Number.isFinite(age_months))) {
        errors.push({ field: 'age_years', message: 'El age_years debe ser una cadena no vacía' });
      }

    if (errors.length > 0) {
        return res.status(400).json({message: 'validation failed', errors})
    }

    next()
}

export default validateUpdatePetDto