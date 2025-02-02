import bcrypt from 'bcrypt'


const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))


export default createHash