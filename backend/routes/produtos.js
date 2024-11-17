import express from 'express'
import ProdutosControllers from '../controllers/produtos.js';

const produtosRouter = express.Router();

const produtosControllers = new ProdutosControllers();

//Inserir Produtos
produtosRouter.post('/', async (req, res) => {
    const { success, statusCode, body } = await produtosControllers.addProdutos(req.body)

    res.status(statusCode).send({ success, statusCode, body })
})

//Busca todos os produtos
produtosRouter.get('/', async (req, res) => {
    const { success, statusCode, body } = await produtosControllers.getProdutos()

    res.status(statusCode).send({ success, statusCode, body })
})

//Busca um produto específico
produtosRouter.get('/:id', async (req, res) => {
    const { success, statusCode, body } = await produtosControllers.getProduto(req.params.id)

    res.status(statusCode).send({ success, statusCode, body })
})

//Deletar produto
produtosRouter.delete('/:id', async (req, res) => {
    const { success, statusCode, body } = await produtosControllers.deleteProduto(req.params.id)

    res.status(statusCode).send({ success, statusCode, body })
})

//Atualizar produto
produtosRouter.put('/:id', async (req, res) => {
    const { success, statusCode, body} = await produtosControllers.updateProduto(req.params.id, req.body)

    res.status(statusCode).send({ success, statusCode, body})
})

export default produtosRouter