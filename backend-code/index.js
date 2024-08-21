const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { Todo } = require('./models')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// GET: Lista todas as tarefas (não excluídas)
app.get('/todos', async (req, res) => {
	const todos = await Todo.findAll({ where: { deletedAt: null } })
	res.json(todos)
})

// POST: Cria uma nova tarefa
app.post('/todos', async (req, res) => {
	const { name } = req.body
	const todo = await Todo.create({ name })
	res.status(201).json(todo)
})

// PUT: Atualiza uma tarefa existente
app.put('/todos/:id', async (req, res) => {
	const { id } = req.params
	const { name, isFinished } = req.body
	const todo = await Todo.findByPk(id)
	if (todo) {
		todo.name = name
		todo.updatedAt = new Date()
		todo.isFinished = isFinished
		await todo.save()
		res.json(todo)
	} else {
		res.status(404).json({ error: 'Tarefa não encontrada' })
	}
})

// DELETE: Marca uma tarefa como excluída (exclusão lógica)
app.delete('/todos/:id', async (req, res) => {
	const { id } = req.params
	const todo = await Todo.findByPk(id)
	if (todo) {
		await todo.destroy()
		res.json({ message: 'Tarefa excluída' })
	} else {
		res.status(404).json({ error: 'Tarefa não encontrada' })
	}
})

// Inicia o servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`)
})
