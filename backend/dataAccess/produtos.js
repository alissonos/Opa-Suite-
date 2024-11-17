import { Mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";

const collectionName = 'produtos'

export default class ProdutosDataAccess {

    async addProduto(produtoData) {
        const produto = await Mongo.db
            .collection(collectionName)
            .insertOne(produtoData)

        return produto
    }

    async getProdutos() {
        const result = await Mongo.db
            .collection(collectionName)
            .find({})
            .toArray()

        return result
    }

    async getProduto(produtoId) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOne({_id: new ObjectId(produtoId)})

        return result
    }

    async deleteProduto(produtoId) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndDelete({ _id: new ObjectId(produtoId) })

        return result
    }

    async updateProduto(produtoId, produtoData) {

        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: new ObjectId(produtoId) },
                { $set: produtoData })

        return result
    }
}
