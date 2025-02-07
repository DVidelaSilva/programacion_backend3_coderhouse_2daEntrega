
const UpdateAdoptionDto = (req, res, next) => {

  const {owner_id, pet_id} = req.body
    const errors = []

    if( typeof owner_id !== 'string' || !owner_id.trim()) {
        errors.push({fields: 'owner_id', message: 'El owner_id debe ser una cadena no vacia'})
    }
    if( typeof pet_id !== 'string' || !pet_id.trim()) {
      errors.push({fields: 'pet_id', message: 'El pet_id debe ser una cadena no vacia'})
  }

    if (errors.length > 0) {
        return res.status(400).json({message: 'validation failed', errors})
    }

    next()
}

export default UpdateAdoptionDto