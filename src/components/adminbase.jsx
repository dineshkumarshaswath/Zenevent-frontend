import React, { children } from 'react'
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faAddressBook, faDeleteLeft, faFileEdit, faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { Col, Container, Row, Button } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';






function Adminbase({ children }) {
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
            <Navbar.Brand href="/">
              <img
                src="https://scontent.fsxv1-1.fna.fbcdn.net/v/t39.30808-6/225361532_226462172741430_8791264933502929167_n.png?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5ICAfIp-tL8AX86VWyj&_nc_ht=scontent.fsxv1-1.fna&oh=00_AfDlbRd2osSILfsjSWsQQyuDYkZbllwkKXZNtELA0n4tOg&oe=64AB8686"

                style={{ width: '50px', height: '40px', ObjectFit: 'contain' }}

                alt=" logo"
              />
            </Navbar.Brand>

            <Navbar.Brand href="/class">Admin</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end" bg="primary" data-bs-theme="dark"
            >
              <Offcanvas.Header closeButton  >
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Admin
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">

                  <NavDropdown
                    title="Dashboard"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/class">class</NavDropdown.Item>
                    <NavDropdown.Item href="/createclass">
                      createclass
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/allattendance">
                      Attendance
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="/signin">signin</Nav.Link>
                  <Nav.Link href="/"><Button variant="secondary" size="sm" onClick={handleClick}>Logout</Button></Nav.Link>
                </Nav>

              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <Row >

        <Col>  {children}</Col>        </Row>

    </>

   
  )

}
export default Adminbase

