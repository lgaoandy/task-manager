import { List, ThemeIcon } from '@mantine/core'
import { KeyedMutator } from 'swr'
import { ENDPOINT, Todo } from '../App'
import { CheckCircleFillIcon } from '@primer/octicons-react'

function TastList({ mutate, data }: { mutate: KeyedMutator<Todo[]>, data: Todo[] }) {
    async function markTodoAsDone(id: number) {
        const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
            method: "PATCH"
        }).then((r) => r.json())
        mutate(updated)
    }

    return (
        <List spacing="xs" size="sm" mb={12} center>
            {data?.map((todo: Todo) => {
                return <List.Item
                    sx={() => ({
                        background: "#ededed",
                        padding: "6px 10px",
                        borderRadius: "12px"
                    })}
                    onClick={() => markTodoAsDone(todo.id)}
                    key={`todo__${todo.id}`} icon={
                        todo.done ? (
                            <ThemeIcon color="teal" size="24" radius="xl">
                                <CheckCircleFillIcon size={20} />
                            </ThemeIcon>) : (
                            <ThemeIcon color="gray" size="24" radius="xl">
                                <CheckCircleFillIcon size={20} />
                            </ThemeIcon>)
                    }>
                    {todo.title}
                </List.Item>
            })}
        </List>
    )
}

export default TastList