import { ENDPOINT, Todo } from '../App'
import { List, ThemeIcon } from '@mantine/core'
import { KeyedMutator } from 'swr'
import styled from '@emotion/styled'
import classNames from 'classnames'
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
                return <ListItem
                    className={classNames({ done: todo.done })}
                    onClick={() => markTodoAsDone(todo.id)}
                    key={`todo__${todo.id}`} icon={(
                        <ThemeIcon color={todo.done ? "teal" : "gray"} size="24" radius="xl">
                            <CheckCircleFillIcon size={20} />
                        </ThemeIcon>)
                    }>
                    <Title>{todo.title}</Title>
                    {todo.body && <Description>{todo.body}</Description>}
                </ListItem>
            })}
        </List>
    )
}

const ListItem = styled(List.Item)`
    background: #ededed;
    padding: 6px 10px;
    border-radius: 12px;
    transition: background 200ms ease, scale 100ms ease;
    cursor: pointer;

    &:hover {
        scale: 1.02;
    }

    &.done {
        background: #aeebd0;
    }
`

const Title = styled.div`

`

const Description = styled.div`
    margin-top: 4px;
    font-size: 11px;
    color: gray;
`

export default TastList