
const validateCreatePetDto = (req, res, next) => {

    const { name, type, age_months, age_years } = req.body;

    const errors = []

    if(typeof name !== 'string' || !name.trim()) {
        errors.push({fields: 'name', message: 'El name debe ser una cadena no vacia'})
    }
    if (typeof type !== 'string' || !type.trim()) {
        errors.push({ field: 'type', message: 'El type debe ser una cadena no vacía' });
      }

    if (typeof age_months !== 'number' || age_months < 0 || !Number.isFinite(age_months)) {
      errors.push({ field: 'age_months', message: 'Debe ser un número no negativo (puede ser cero)' });
    }

    if (typeof age_years !== 'number' || age_years < 0 || !Number.isFinite(age_months)) {
      errors.push({ field: 'age_years', message: 'Debe ser un número no negativo (puede ser cero)' });
    }

    if (errors.length > 0) {
        return res.status(400).json({message: 'validation failed', errors})
    }

    next()
}

export default validateCreatePetDto