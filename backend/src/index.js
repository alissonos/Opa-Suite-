import express from 'express'
import cors from 'cors'
import { Mongo } from '../database/mongo.js'
import { config } from 'dotenv'
import authRouter from './auth/auth.js'
import usersRouter from '../routes/users.js'
import produtosRouter from '../routes/produtos.js'
import categoriasRouter from '../routes/categorias.js'

config()

async function main(params) {
    const hostname = 'localhost'
    const port = 3500
    
    const app = express()

    const mongoConection = await Mongo.connect({mongoConnectionString: process.env.MONGO_CS, mongoDbName: process.env.MONGO_DB_NAME})

    console.log(mongoConection)


    app.use(express.json())
    app.use(cors())

    app.get('/', (req, res) => {
        res.send({
            sucess: true,
            statusCode: 200,
            body: "Bem vindo ao OpaSuite!"
        })
    })

    // routes
    app.use('/auth', authRouter)
    app.use('/users', usersRouter)
    app.use('/produtos', produtosRouter)
    app.use('/categorias', categoriasRouter)

    
    app.listen(port, () => {
        console.log(`Server running on: http://${hostname}:${port}`)
    })
}

main()