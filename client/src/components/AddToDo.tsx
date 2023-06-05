import { useState } from "react"
import { useForm } from "@mantine/form"
import { Button as MantineButton, Modal, Group, TextInput, Textarea } from "@mantine/core"
import styled from "@emotion/styled"
import { ENDPOINT, Todo } from "../App"
import { KeyedMutator } from "swr"
import { DateInput } from "@mantine/dates"

function AddToDo({ mutate }: { mutate: KeyedMutator<Todo[]> }) {
    const [open, setOpen] = useState(false)

    const form = useForm({
        initialValues: {
            title: "",
            body: ""
        }
    })

    async function createToDo(values: { title: string, body: string }) {
        const updated = await fetch(`${ENDPOINT}/api/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then((r) => r.json())

        mutate(updated)
        form.reset()
        setOpen(false)
    }

    return (
        <>
            <Modal opened={open} onClose={() => setOpen(false)} title="Create todo">
                <form onSubmit={form.onSubmit(createToDo)}>
                    <TextInput required mb={12} label="Task name" placeholder="What do you want to do?" {...form.getInputProps("title")} />
                    <Textarea mb={12} label="Task description" placeholder="Tell me more..." {...form.getInputProps("body")} />
                    <DateInput mb={24} valueFormat="dddd, MMM D" label="Date" />
                    <Button type="submit">Create task</Button>
                </form>
            </Modal>

            <Group position="center">
                <Button fullWidth mb={12} onClick={() => setOpen(true)}>
                    NEW TASK
                </Button>
            </Group>
        </>
    )
}

const Button = styled(MantineButton)`
    background: white;
    border: 1px dashed #bfbfbf;
    color: #595959;
    transition: all 200ms ease;

    &:hover {
        background: #adc6ff;
        border-color: white;
        color: white;
        scale: 1.02;
    }
`

export default AddToDo