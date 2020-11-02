import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

export function Loading() {
  return (
    <Container fluid className='loading'>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Container>
  )
}