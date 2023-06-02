import { AppShell, Box, Button, Header, List, Navbar, ThemeIcon } from '@mantine/core'
import useSWR from "swr"
import styled from "styled-components"

import AddToDo from "./components/AddToDo"
import { CheckCircleFillIcon } from '@primer/octicons-react'
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
		<AppShell
			padding="md"
			navbar={<Navbar width={{ base: 300 }} height={500} p="xs">{
				<Navbar.Section>
					<Button variant="light" color="cyan" fullWidth>
						Assets/Hosts
					</Button>
					<Button variant="light" color="cyan" fullWidth>
						Assets/Hosts
					</Button>
					<Button variant="light" color="cyan" fullWidth>
						Assets/Hosts
					</Button>
				</Navbar.Section>
			}</Navbar>}
			header={<Header height={60} p="xs">{ }</Header>}
			styles={(theme) => ({
				main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
			})}
		>
			<Box sx={() => ({
				padding: "2rem",
				width: "100%",
				maxWidth: "40rem",
				margin: "0 auto"
			})}>
				<TaskList mutate={mutate} data={data} />
				<AddToDo mutate={mutate} />
			</Box>
		</AppShell>
	)
}

export default App
