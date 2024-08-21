import axios from 'axios'

const httpClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
	headers: {
		'Content-type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
})

export async function GET(req) {
	try {
		const response = await httpClient.get('/todos')
		return new Response(JSON.stringify(response.data), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Error fetching data' }), {
			status: error.response?.status || 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}

export async function POST(req) {
	const data = await req.json()
	try {
		const response = await httpClient.post('/todos', data)
		return new Response(JSON.stringify(response.data), {
			status: 201,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Error posting data' }), {
			status: error.response?.status || 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}

export async function PUT(req) {
	const { searchParams } = new URL(req.url, `http://${req.headers.get('host')}`)

	// Extract the 'item' parameter from the URL
	const itemId = searchParams.get('item')

	const data = await req.json()

	try {
		const response = await httpClient.put(`/todos/${itemId}`, data)
		return new Response(JSON.stringify(response.data), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Error updating data' }), {
			status: error.response?.status || 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}

export async function DELETE(req) {
	const { searchParams } = new URL(req.url, `http://${req.headers.get('host')}`)

	// Extract the 'item' parameter from the URL
	const itemId = searchParams.get('item')

	try {
		const response = await httpClient.delete(`/todos/${itemId}`)
		return new Response(JSON.stringify(response.data), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Error deleting data' }), {
			status: error.response?.status || 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}
