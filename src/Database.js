import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()
mongoose.set('strictQuery', true)

const connection = async () => {
    try{
        const {connection} = await mongoose.connect(process.env.MONGODBURILOCAL)
        console.log(`Database is connected on ${connection.host} - ${connection.post}`)
    }catch (error){
        console.log(error)
    }
}

export default connection