import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import RegisterForm from '../../components/RegisterForm'

const Register = () => {
  return (
    <Container fluid className='border'>
      <Row className='justify-content-center'>
        <Col className='' lg={3}>
          <RegisterForm/>
        </Col>
      </Row>
    </Container>
  )
}

export default Register
