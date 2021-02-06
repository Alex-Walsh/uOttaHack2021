import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AppStreamCam } from './phototaking';
import Dashboard from './dashaboard';


export default function MainPage() {
    return (
    <Container>
        <Row>
            <Col lg="10">
                <AppStreamCam />
            </Col>
            <Col lg="2">
                <Dashboard />
            </Col>
        </Row>
    </Container>
    );
}