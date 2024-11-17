import express from 'express'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import crypto from 'crypto'
import { Mongo } from '../../database/mongo.js'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import { text } from 'stream/consumers'
import { error } from 'console'

const collectionName = 'users'

const authRouter = express.Router()

passport.use(new LocalStrategy({ usernameField: 'userName' }, async (userName, password, callback) => {
    const user = await Mongo.db
        .collection(collectionName)
        .findOne({ userName: userName })

    if (!user) {
        return callback(null, false)
    }

    const saltBuffer = user.salt.buffer

    crypto.pbkdf2(password, saltBuffer, 310000, 16, 'sha256', (error, hashedPassword) => {
        if (error) {
            return callback(error)
        }

        const userPasswordBuffer = Buffer.from(user.password.buffer)

        if (!crypto.timingSafeEqual(userPasswordBuffer, hashedPassword)) {
            return callback(null, false)
        }

        const { password, salt, ...rest } = user

        return callback(null, rest)
    })
}))

//criar usuário
authRouter.post('/signup', async (req, res) => {
    const checkUser = await Mongo.db
        .collection(collectionName)
        .findOne({ userName: req.body.userName })

    if (checkUser) {
        return res.status(500).send({
            success: false,
            statusCode: 500,
            body: {
                text: 'Usuário já cadastrado!'
            }
        })
    }

    const salt = crypto.randomBytes(16)

    crypto.pbkdf2(req.body.password, salt, 310000, 16, 'sha256', async (error, hashedPassword) => {
        if (error) {
            res.status(500).send({
                success: false,
                statusCode: 500,
                body: {
                    text: 'Erro na crypto password'
                }
            })
        }

        const result = await Mongo.db
            .collection(collectionName)
            .insertOne({
                userName: req.body.userName,
                password: hashedPassword,
                salt
            })

        if (result.insertedId) {
            const user = await Mongo.db
                .collection(collectionName)
                .findOne({ _id: new ObjectId(result.insertedId) })

            const token = jwt.sign(user, 'secret')

            return res.send({
                success: true,
                statusCode: 200,
                body: {
                    text: 'Usuário registrado corretamente',
                    token,
                    user,
                    logged: true
                }
            })
        }
    })
})

//login usuário
authRouter.post('/login', async (req, res) => {
    passport.authenticate('local', (error, user) => {
        if (error) {
            return res.status(500).send({
                success: false,
                statusCode: 500,
                body: {
                    text: 'Erro durante a autenticação',
                    error
                }
            })
        }

        if (!user) {
            return res.status(400).send({
                success: false,
                statusCode: 400,
                body: {
                    text: 'Credenciais não estão corretas!'
                }
            })
        }

        const token = jwt.sign(user, 'secret')
        return res.status(200).send({
            success: true,
            statusCode: 200,
            body: {
                text: 'Usuário logado corretamente!',
                user,
                token
            }
        })
    })(req, res)
})


export default authRouter