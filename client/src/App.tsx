import { Box } from '@mantine/core'
import useSWR from "swr"

import AddToDo from "./components/AddToDo"
import TaskList from "./components/TaskList"
import './App.css'

export interface Todo {
	id: number
	title: string
	body: string
	done: boolean
}

export const ENDPOINT = "http://localhost:4000"

const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then(r => r.json())

function App() {
	const { data, mutate } = useSWR("api/todos", fetcher)

	async function markTodoAsDone(id: number) {
		const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
			method: "PATCH"
		}).then((r) => r.json())
		mutate(updated)
	}

	return (
		<Box sx={() => ({
			padding: "2rem",
			width: "100%",
			maxWidth: "40rem",
			margin: "0 auto"
		})}>
			<AddToDo mutate={mutate} />
			<TaskList mutate={mutate} data={data} />
		</Box>
	)
}

export default App
