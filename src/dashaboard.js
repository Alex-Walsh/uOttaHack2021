import React, {useContext, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { AppContext } from './App';
import './style.css';
function getdashboarddata() {
    return axios.get('https://us-central1-fitness-app-db0b5.cloudfunctions.net/api/gethackdata')
        .then(function(response) {
            return response;
        });
    
    
}

export default function Dashboard() {
    
    const context = useContext(AppContext);
    useEffect(async () => {
        let generaldata = await getdashboarddata();
        console.log(generaldata.data);
        context.cough.set(generaldata.data.cough);
        context.facetouch.set(generaldata.data.facethouch);
    },[])
    return (
        <div className="dashboard">
            <Container>
                <Col>
                <Row>
            Coughs : {context.cough.get} 
                </Row>
                <Row>
                    Facetouches : {context.facetouch.get}
                </Row>
             
            
            
            </Col>
            </Container>
        </div>

    );
}