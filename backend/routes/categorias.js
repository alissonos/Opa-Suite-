import express from 'express'
import CategoriasControllers from '../controllers/categorias.js';

const categoriasRouter = express.Router();

const categoriasControllers = new CategoriasControllers();

//Adiciona Categorias
categoriasRouter.post('/', async (req, res) => {
    const { success, statusCode, body } = await categoriasControllers.addCategorias(req.body)

    res.status(statusCode).send({ success, statusCode, body })
})

//Busca todos os categorias
categoriasRouter.get('/', async (req, res) => {
    const { success, statusCode, body } = await categoriasControllers.getCategorias()

    res.status(statusCode).send({ success, statusCode, body })
})

//Busca uma categoria específico
categoriasRouter.get('/:id', async (req, res) => {
    const { success, statusCode, body } = await categoriasControllers.getCategoriasByUseId(req.params.id)

    //console.log(req.params.id)
    res.status(statusCode).send({ success, statusCode, body })
})

// Deleta categoria
categoriasRouter.delete('/:id', async (req, res) => {
    const { success, statusCode, body } = await categoriasControllers.deleteCategoria(req.params.id)

    res.status(statusCode).send({ success, statusCode, body })
})


// Atualiza categoria
categoriasRouter.put('/:id', async (req, res) => {
    const { success, statusCode, body } = await categoriasControllers.updateCategoria(req.params.id, req.body)

    res.status(statusCode).send({ success, statusCode, body })
})

export default categoriasRouter