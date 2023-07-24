import React, { children } from 'react'

import { Col, Container, Row, Button } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import zenimage from "../Images/zenclass.png"





function Studentbase({ children }) {
  const history = useHistory()
  function handleClick() {
    localStorage.removeItem("token")
    history.push("/")
  }
  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} bg="primary" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="#home">
              <img
                src={zenimage}

                style={{ width: '50px', height: '40px', ObjectFit: 'contain' }}

                alt="zen"
              />
            </Navbar.Brand>

            <Navbar.Brand href="#">Student</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end" bg="primary" data-bs-theme="dark"
            >
              <Offcanvas.Header closeButton  >
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Student
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/signin">Signin</Nav.Link>
                  <Nav.Link href="/">
                    <Button variant="secondary" size="sm" onClick={handleClick}>Logout</Button></Nav.Link>

                </Nav>

              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

      <Row >

        <Col>  {children}</Col>



      </Row>

    </>





  )

}
export default Studentbase

