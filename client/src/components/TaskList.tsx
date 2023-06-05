import { ENDPOINT, Todo } from '../App'
import { ActionIcon, List, ThemeIcon } from '@mantine/core'
import { KeyedMutator } from 'swr'
import styled from '@emotion/styled'
import classNames from 'classnames'
import { CheckCircleFillIcon } from '@primer/octicons-react'
import { MdModeEdit } from "react-icons/md"

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
                return <ListItem>
                    <Flex>
                        <Time>11:15 AM</Time>
                        <Task
                            className={classNames({ done: todo.done })}
                            onClick={() => markTodoAsDone(todo.id)}
                            key={`todo__${todo.id}`} icon={(
                                <ThemeIcon color={todo.done ? "teal" : "gray"} size="24" radius="xl">
                                    <CheckCircleFillIcon size={20} />
                                </ThemeIcon>)
                            }>
                            <Title>{todo.title}</Title>
                            {todo.body && <Description>{todo.body}</Description>}
                        </Task>
                        <ActionIcon variant="subtle" color="cyan">
                            <MdModeEdit />
                        </ActionIcon>
                    </Flex>
                </ListItem>
            })}
        </List>
    )
}

const Time = styled.div`
    min-width: 70px;
    color: gray;
`

const Flex = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    gap: 5px;
`

const Task = styled.div`
    background: #ededed;
    padding: 6px 10px;
    border-radius: 12px;
    transition: background 200ms ease, scale 100ms ease;
    cursor: pointer;
    width: 100%;

    &:hover {
        scale: 1.02;
    }

    &.done {
        background: #aeebd0;
    }
`

const ListItem = styled(List.Item)`
    display: flex;
    width: 100%;
    align-items: center;
    gap: 5px;
`

const Title = styled.div`

`

const Description = styled.div`
    margin-top: 4px;
    font-size: 11px;
    color: gray;
`

export default TastList