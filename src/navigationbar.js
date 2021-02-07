import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';
import './style.css';

export default function Navigationbar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand><Link to="/" className="whitelink">CovidEye</Link></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto" >
      <Nav.Link className="whitelink" href="https://alex-walsh.github.io/uOttaHack2021/about-us/" >About Us</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    );
}