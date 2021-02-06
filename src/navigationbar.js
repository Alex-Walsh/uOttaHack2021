import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


export default function Navigationbar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">SymptomsAI</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features">Monitor</Nav.Link>
      <Nav.Link href="#pricing">About Us</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    );
}