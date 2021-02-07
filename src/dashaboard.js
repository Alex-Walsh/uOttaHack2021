import React, {useContext, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { AppContext } from './App';
import './style.css';
import Card from 'react-bootstrap/Card'
import { AppStreamCam } from './phototaking';
import Button from 'react-bootstrap/Button';
// function getdashboarddata() {
//     return axios.get('https://us-central1-fitness-app-db0b5.cloudfunctions.net/api/gethackdata')
//         .then(function(response) {
//             return response;
//         });
    
    
// }

function setdashboarddata(coughs, touch) {
    var paramator = {params:{coughs:coughs, newfacetouches:touch}};
    console.log(paramator);
    axios.get('https://us-central1-virtual-vinyls.cloudfunctions.net/api/modifyhackdata', {params:{coughs:coughs, newfacetouches:touch}})
        .then(function(response) {
            //console.log(response);
            return response;
        });
}

export default function Dashboard() {
    
    const context = useContext(AppContext);
    useEffect(() => {
        async function actuallyRun() {
            // let generaldata = await getdashboarddata();
            // console.log(generaldata.data);
            // context.cough.set(generaldata.data.cough);
            // context.facetouch.set(generaldata.data.facethouch);
            setInterval(() => {
                // console.log(context.facetouch.get);
                // console.log(context.cough.get);
                setdashboarddata(document.getElementById("snipe1").innerHTML, document.getElementById("snipe2").innerHTML);
            }, 1000*60);
        }
        actuallyRun();
    },[]);
    return (
        <div className="dashboard">
            <Container>
                <Col>
                <Card>
                <Row>
    <Card.Body>
<Card.Title>Coughs</Card.Title>
    <Card.Text id="snipe1">
    {context.cough.get}
    </Card.Text>
  </Card.Body>                  
</Row>
            
                <Row>
                  
                    <Card.Body>
<Card.Title>Face Touches</Card.Title>
    <Card.Text id="snipe2">
    {context.facetouch.get}
    </Card.Text>
  </Card.Body>  
                </Row>
             
                </Card>
            
            </Col>
            </Container>
        </div>

    );
}



