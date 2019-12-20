import * as React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as uuid from 'uuid/v4'

class Entry {
    constructor(readonly key: string, readonly value: string, readonly id: string = uuid()) {}
}

const initialProps = {
    properties: [] as string[][],
    onPropertiesChange: (_: string[][]): void => {},
}

type TProperties = Partial<typeof initialProps>
export const Properties: React.FC<TProperties> = (props) => {
    // tslint:disable-next-line: variable-name
    const [properties, _setProperties] = React.useState(
        props.properties!.length !== 0
            ? props.properties!.map(([key, value]) => new Entry(key, value))
            : new Array(new Entry('', ''))
    )

    const addRow = (id: string) => {
        const index = properties.findIndex((e) => e.id === id)
        if (!properties.find(({ key }) => key === '')) {
            const newProperties = Array.from(properties)
            newProperties.splice(index + 1, 0, new Entry('', ''))
            setProperties(newProperties)
        }
    }

    const deleteRow = (id: string) => {
        const index = properties.findIndex((e) => e.id === id)
        const newProperties = Array.from(properties)
        if (properties.length === 1) {
            newProperties.splice(index, 1, new Entry('', ''))
        } else {
            newProperties.splice(index, 1)
        }
        setProperties(newProperties)
    }

    const onChangeHandler = (id?: string) => {
        const newProperties = Array.from(properties)
        if (id) {
            const keyInput = document.querySelector(`[data-id='key-${id}']`) as HTMLInputElement
            const valueInput = document.querySelector(`[data-id='value-${id}']`) as HTMLInputElement
            const value = valueInput.value
            const key = keyInput.value
            const index = properties.findIndex((e) => e.id === id)
            if (key) {
                newProperties.splice(index, 1, new Entry(key, value, properties[index].id))
            }
        }
        setProperties(newProperties)
    }

    const setProperties = (newProperties: Entry[]) => {
        _setProperties(newProperties)
        const mappedProperties: string[][] = newProperties
            .filter((e) => e.key.trim() !== '' && e.value.trim() !== '')
            .map((e) => [e.key, e.value])
        props.onPropertiesChange!.call(null, mappedProperties)
    }

    const entries = properties.map(({ key, value, id }, index) => {
        return (
            <Form.Group as={Row} key={id} data-id={'row-' + key} className='justify-content-center'>
                <Col md='4' sm={6} lg='5'>
                    <Form.Control
                        type='text'
                        placeholder='Key'
                        data-id={'key-' + id}
                        defaultValue={key}
                        onChange={(e: any) => {
                            const event = e as React.FormEvent<HTMLInputElement>
                            const id = (event.currentTarget.dataset.id as string).replace('key-', '')
                            onChangeHandler(id)
                        }}
                    />
                </Col>
                <Col md='4' sm={6} lg='5'>
                    <Form.Control
                        type='text'
                        placeholder='Value'
                        defaultValue={value}
                        data-id={'value-' + id}
                        onChange={(e: any) => {
                            const event = e as React.FormEvent<HTMLInputElement>
                            const id = (event.currentTarget.dataset.id as string).replace('value-', '')
                            onChangeHandler(id)
                        }}
                    />
                </Col>
                <Col md='4' lg='2'>
                    <Button
                        style={{ display: 'inline-block' }}
                        variant='danger'
                        data-id={'delete-' + id}
                        onClick={(e: any) => {
                            const event = e as React.FormEvent<HTMLButtonElement>
                            const id = (event.currentTarget.dataset.id as string).replace('delete-', '')
                            deleteRow(id)
                        }}>
                        -
                    </Button>
                    <Button
                        style={{ display: 'inline-block', marginLeft: '5px' }}
                        hidden={index !== properties.length - 1}
                        variant={key ? 'success' : 'dark'}
                        data-id={'add-' + id}
                        onClick={(e: any) => {
                            const event = e as React.FormEvent<HTMLButtonElement>
                            const id = (event.currentTarget.dataset.id as string).replace('add-', '')
                            addRow(id)
                        }}>
                        +
                    </Button>
                </Col>
            </Form.Group>
        )
    })

    return <Container fluid>{entries}</Container>
}
Properties.defaultProps = initialProps

export default Properties
