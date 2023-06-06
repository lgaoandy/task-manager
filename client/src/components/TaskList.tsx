import { ENDPOINT, Todo } from '../App'
import { ActionIcon } from '@mantine/core'
import { KeyedMutator } from 'swr'
import styled from '@emotion/styled'
import classNames from 'classnames'
import { MdModeEdit } from "react-icons/md"
import { BiTimeFive, BiCheck } from "react-icons/bi"
import { GiCheckMark } from "react-icons/gi"

function TastList({ mutate, data }: { mutate: KeyedMutator<Todo[]>, data: Todo[] }) {
    async function markTodoAsDone(id: number) {
        const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
            method: "PATCH"
        }).then((r) => r.json())
        mutate(updated)
    }

    return (
        <List>
            {data?.map((todo: Todo) => {
                return <ListItem>
                    <Checkbox>
                        <Checkmark />
                    </Checkbox>
                    <Container>
                        <TimeBlock>
                            <BiTimeFive /><Time>11:15 AM</Time>
                        </TimeBlock>
                        <Task
                            className={classNames({ done: todo.done })}
                            onClick={() => markTodoAsDone(todo.id)}
                            key={`todo__${todo.id}`}>
                            <Title>{todo.title}</Title>
                            {todo.body && <Description>{todo.body}</Description>}
                        </Task>
                    </Container>
                    <ActionIcon variant="subtle" color="blue">
                        <MdModeEdit />
                    </ActionIcon>
                </ListItem>
            })}
        </List >
    )
}

const List = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;
    font-family: "Open Sans", -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
`

const ListItem = styled.div`
    display: flex;
    width: 100%;
    gap: 5px;
`

const Checkbox = styled.div`
    border: 2px solid #bdbdbd;
    border-radius: 100%;
    margin-top: 26px;
    margin-right: 8px;
    min-width: 16px;
    min-height: 16px;
    align-self: flex-start;
    position: relative;
    transition: border-color 150ms ease, background 250ms ease;
    cursor: pointer;

    &:hover {
        border-color: #73d13d;
        background: #95de64;
    }

    &.done {
        border-color: #52c41a;
    }
`

const Checkmark = styled(BiCheck)`
    position: absolute;
    font-size: 32px;
    top: -11px;
    left: -5px;
    color: #73d13d;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const TimeBlock = styled.div`
    display: flex;
    margin-left: 14px;
    margin-bottom: 2px;
    gap: 4px;
    color: gray;
`

const Time = styled.div`
    min-width: 70px;
    font-size: 11px;
`

const Task = styled.div`
    background: #f8f8f8;
    padding: 6px 14px 8px 14px;
    border-radius: 6px;
    transition: background 200ms ease, scale 100ms ease;
    cursor: pointer;

    &:hover {
        scale: 1.02;
    }

    &.done {
        background: #d9f7be;
    }
`

const Title = styled.h4`
    font-size: 15px;
    font-weight: 400;
    margin: 0;
`

const Description = styled.div`
    padding-top: 2px;
    font-family: "Open Sans Light";
    font-size: 13px;
    color: #757a94;

    &:hover {
        color: #818cc7;
    }
`

export default TastList