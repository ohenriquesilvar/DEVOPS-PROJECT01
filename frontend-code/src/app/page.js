'use client'
import React from 'react'

import Form from '@/components/Form'
import Header from '@/components/Header'
import TODOHero from '@/components/TODOHero'
import TODOList from '@/components/TODOList'
import axios from 'axios'

export const httpClient = axios.create({
	baseURL: '/api',
	headers: {
		'Content-type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
})

function Home() {
	const [todos, setTodos] = React.useState([])

	React.useEffect(() => {
		const getTodos = async () => {
			const response = await httpClient.get('/todos')
			console.log(response.data)
			setTodos(response.data)
		}

		getTodos()
	}, [])

	const todos_completed = todos.filter((todo) => todo.isFinished == true).length

	const total_todos = todos.length
	return (
		<div className='wrapper'>
			<Header />
			<TODOHero todos_completed={todos_completed} total_todos={total_todos} />
			<Form setTodos={setTodos} />
			<TODOList todos={todos} setTodos={setTodos} />
		</div>
	)
}

export default Home
