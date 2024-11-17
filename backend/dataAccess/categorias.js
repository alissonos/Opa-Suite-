import { Mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";

const collectionName = 'categorias'

export default class CategoriasDataAccess {

    async addCategoria(categoriaData) {
        const { items, ...categoriaDataRest } = categoriaData

        categoriaDataRest.createdAt = new Date()
        categoriaDataRest.userId = new ObjectId(categoriaDataRest.userId)

        const newCategoria = await Mongo.db
            .collection(collectionName)
            .insertOne(categoriaDataRest)

        if (!newCategoria.insertedId) {
            throw new Error('Categoria não pode ser inserida')
        }

        items.map((item) => {
            item.produtoId = new ObjectId(item.produtoId)
            item.categoriaId = new ObjectId(newCategoria.insertedId)
            item.userId = categoriaDataRest.userId
        })

        const categoria = await Mongo.db
            .collection("categoriaId")
            .insertMany(items)

        return {
            categoria: categoria,
            userId: categoriaDataRest.userId
        }
    }

    async getCategorias() {
        const result = await Mongo.db
            .collection(collectionName)
            .aggregate([{
                $lookup: {
                    from: 'categoriaId',
                    localField: '_id',
                    foreignField: 'categoriaId',
                    as: 'categoriaItems'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            {
                $project: {
                    'userDetails.password': 0,
                    'userDetails.salt': 0
                }
            },
            {
                $unwind: '$categoriaItems',
            },
            {
                $lookup: {
                    from: 'produtos',
                    localField: 'categoriaItems.produtoId',
                    foreignField: '_id',
                    as: 'categoriaItems.itemDetails'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    userDetails: { $first: '$userDetails' },
                    categoriaItems: { $push: '$categoriaItems' }
                }
            }
            ])
            .toArray()

        return result
    }

    async getCategoriasByUserId(userId) {
        const result = await Mongo.db
            .collection(collectionName)
            .aggregate([
                {
                    $match: {
                        userId: new ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        from: 'categoriaId',
                        localField: '_id',
                        foreignField: 'categoriaId',
                        as: 'categoriaItems'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'userDetails'
                    }
                },
                {
                    $project: {
                        'userDetails.password': 0,
                        'userDetails.salt': 0
                    }
                },
                {
                    $unwind: '$categoriaItems',
                },
                {
                    $lookup: {
                        from: 'produtos',
                        localField: 'categoriaItems.produtoId',
                        foreignField: '_id',
                        as: 'categoriaItems.itemDetails'
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        userDetails: { $first: '$userDetails' },
                        categoriaItems: { $push: '$categoriaItems' }
                    }
                }
            ])
            .toArray()

        return result
    }

    //Deletar Categoria
    async deleteCategoria(categoriaId) {

        const itemsToDelete = await Mongo.db
            .collection('categoriaId')
            .deleteMany({ categoriaId: new ObjectId(categoriaId) })

        const categoriaDelete = await Mongo.db
            .collection(collectionName)
            .findOneAndDelete({ _id: new ObjectId(categoriaId) })

        const result = {
            itemsToDelete,
            categoriaDelete
        }

        return result
    }

    //Atualizando categoria
     async updateCategoria(categoriaId, categoriaData) {
         const result = await Mongo.db
             .collection(collectionName)
             .findOneAndUpdate(
                 { _id: new ObjectId(categoriaId) },
                 { $set: categoriaData })

         return result
     }
}
