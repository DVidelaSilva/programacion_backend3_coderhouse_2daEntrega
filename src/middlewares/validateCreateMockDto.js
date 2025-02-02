
const validateCreateMockDto = (req, res, next) => {

    const { users, pets } = req.body;

    const errors = []

    if (typeof users !== 'number' || users < 0 || !Number.isFinite(users)) {
      errors.push({ field: 'users', message: 'Debe ser un número no negativo (puede ser cero)' });
    }

    if (typeof pets !== 'number' || pets < 0 || !Number.isFinite(pets)) {
      errors.push({ field: 'pets', message: 'Debe ser un número no negativo (puede ser cero)' });
    }

    if (errors.length > 0) {
      return res.status(400).json({message: 'validation failed', errors})
  }

    next()
}

export default validateCreateMockDto