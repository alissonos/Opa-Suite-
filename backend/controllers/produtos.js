import ProdutosDataAccess from "../dataAccess/produtos.js";
import { ok, serverError } from '../helpers/httpResponses.js'

export default class ProdutosControllers {
    constructor() {
        this.dataAccess = new ProdutosDataAccess()
    }

    async addProdutos(plateData) {
        try {
            const result = await this.dataAccess.addProduto(plateData)

            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    async getProdutos() {
        try {
            const produtos = await this.dataAccess.getProdutos()

            return ok(produtos)
        } catch (error) {
            return serverError(error)
        }
    }

    async getProduto(produtoId) {
        try {
            const produto = await this.dataAccess.getProduto(produtoId)

            return ok(produto)
        } catch (error) {
            return serverError(error)
        }
    }

    async deleteProduto(produtoId) {
        try {
            const result = await this.dataAccess.deleteProduto(produtoId)

            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    async updateProduto(produtoId, produtoData) {
        try {
            const result = await this.dataAccess.updateProduto(produtoId, produtoData)

            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}