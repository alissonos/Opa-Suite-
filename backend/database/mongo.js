import { MongoClient } from 'mongodb'

export const Mongo = {
    async connect({ mongoConnectionString, mongoDbName }) {
        try {
            const client = new MongoClient(mongoConnectionString)
    
            await client.connect()
            const db = client.db(mongoDbName)

            this.client = client
            this.db = db

            return 'conectado ao Mongo!'
            
        } catch (error) {
            return { text: 'Erro durante a conexão ao Mongo!', error }
        }
    }
}