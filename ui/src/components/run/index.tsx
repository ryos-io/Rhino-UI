import * as React from 'react'
import { ChangeEvent } from 'react'
import { Button, Col, Form, FormControl, FormControlProps, FormGroup, Row } from 'react-bootstrap'
import Logger from '../../services/logger'
import { Properties as CProperties } from './properties'

const log = Logger.get('Run')

const initialProps = {
    name: '',
    version: 'latest',
    type: 'Rhino',
    envProperties: [] as string[][],
    sysProperties: [] as string[][],
}

type Properties = Partial<typeof initialProps>

export const Run: React.FC<Properties> = (props) => {
    const [state, setState] = React.useState(initialProps)

    const form = React.useRef<HTMLFormElement>(null)

    const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        log.info(`State: ${JSON.stringify(state)}`)
    }

    return (
        <React.Fragment>
            <h2>Run Test</h2>
            <Form onSubmit={onSumbit} ref={form as any}>
                <Form.Group controlId='template' as={Row}>
                    <Form.Label column sm='2' className='text-sm-right'>
                        Name
                    </Form.Label>
                    <Col sm='10'>
                        <Form.Control
                            type='text'
                            value={state.name}
                            onChange={(e: React.FormEvent<FormControlProps & FormControl>) => {
                                const name = e.currentTarget.value as string
                                setState({ ...state, name })
                            }}
                        />
                    </Col>
                </Form.Group>
                <FormGroup as={Row}>
                    <Form.Label column sm='2' className='text-sm-right'>
                        Version
                    </Form.Label>
                    <Col sm='10' className='text-right'>
                        <Form.Control
                            type='text'
                            value={state.version}
                            onChange={(e: React.FormEvent<FormControlProps & FormControl>) => {
                                const version = e.currentTarget.value as string
                                setState({ ...state, version })
                            }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup as={Row}>
                    <Form.Label column sm='2' className='text-sm-right'>
                        Type
                    </Form.Label>
                    <Col sm='auto'>
                        <Form.Check
                            type='radio'
                            label='Rhino'
                            value='Rhino'
                            checked={state.type === 'Rhino'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                const type = e.currentTarget.value as string
                                setState({ ...state, type })
                            }}
                        />
                    </Col>
                    <Col sm='auto'>
                        <Form.Check
                            type='radio'
                            label='Gatling'
                            value='Gatling'
                            checked={state.type === 'Gatling'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                const type = e.currentTarget.value as string
                                setState({ ...state, type })
                            }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup as={Row}>
                    <Form.Label column sm='2' className='text-sm-right'>
                        Env. Properties
                    </Form.Label>
                    <Col sm='10' className='text-right pl-0 pr-0'>
                        <CProperties
                            properties={props.envProperties}
                            onPropertiesChange={(envProperties) => setState({ ...state, envProperties })}
                        />
                    </Col>
                </FormGroup>
                <FormGroup as={Row}>
                    <Form.Label column sm='2' className='text-sm-right'>
                        Sys. Properties
                    </Form.Label>
                    <Col sm='10' className='text-right pl-0 pr-0'>
                        <CProperties
                            properties={props.sysProperties}
                            onPropertiesChange={(sysProperties) => setState({ ...state, sysProperties })}
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <FormGroup as={Row} className='justif-content-end'>
                        <Col sm='12' className='text-right'>
                            <Button variant='primary' type='submit'>
                                Run
                            </Button>
                        </Col>
                    </FormGroup>
                </FormGroup>
            </Form>
        </React.Fragment>
    )
}

export default Run
