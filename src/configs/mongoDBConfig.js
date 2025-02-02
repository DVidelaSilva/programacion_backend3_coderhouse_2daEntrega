import { connect } from 'mongoose'
import envConfig from './envConfig.js'


const uri = envConfig.mongodb

const connectMongoDB = async () => {
    console.log('Conexion a MongoDB Exitosa');
    await connect(uri)
}


export default connectMongoDB