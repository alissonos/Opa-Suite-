import CategoriasDataAccess from '../dataAccess/Categorias.js'
import { ok, serverError } from '../helpers/httpResponses.js'

export default class CategoriasControllers {
    constructor() {
        this.dataAccess = new CategoriasDataAccess()
    }

    async addCategorias(categoriaData) {
        try {
            // console.log(categoriaData)
            const result = await this.dataAccess.addCategoria(categoriaData)

            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    async getCategorias() {
        try {
            const categorias = await this.dataAccess.getCategorias()

            return ok(categorias)
        } catch (error) {
            return serverError(error)
        }
    }

    async getCategoriasByUseId(userId) {
        try {
            const categorias = await this.dataAccess.getCategoriasByUserId(userId)

            //console.log(userId)
            return ok(categorias)
        } catch (error) {
            return serverError(error)
        }
    }

    async deleteCategoria(categoriaId) {
        try {
            const result = await this.dataAccess.deleteCategoria(categoriaId)

            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    async updateCategoria(categoriaId, categoriaData) {
        try {
            const result = await this.dataAccess.updateCategoria(categoriaId, categoriaData)

            console.log(result)
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}