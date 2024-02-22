import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-light">
            <Container>
                <Row>
                    <Col xs={12} md={4}>
                        <h5>Footer Section 1</h5>
                        <p>Content for the first section of the footer.</p>
                    </Col>
                    <Col xs={12} md={4}>
                        <h5>Footer Section 2</h5>
                        <p>Content for the second section of the footer.</p>
                    </Col>
                    <Col xs={12} md={4}>
                        <h5>Footer Section 3</h5>
                        <p>Content for the third section of the footer.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer