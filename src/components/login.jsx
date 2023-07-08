import React from 'react'
import Base from './base'
import { useState } from 'react'
import { Button, Row, Col, Container } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import * as yup from 'yup'
import { useFormik } from 'formik'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

const loginSchema = yup.object({
    email: yup.string().required("* required").min(10, 'minimum 10 characters required'),
    password: yup.string().required("* required")

})



function Login() {

    const [error, setError] = useState("")
    const history = useHistory()


    const { handleSubmit, handleChange, values, handleBlur, touched, errors } = useFormik({
        initialValues: {
            email: "",
            password: "",

        },
        validationSchema: loginSchema,
        onSubmit: (loginUser) => {
            console.log(loginUser)
            loginFunction(loginUser)
        }

    })

    async function loginFunction(loginUser) {

        setError("")

        const response = await fetch("https://zenevent-be.onrender.com/api/login", {
            method: "POST",
            body: JSON.stringify(loginUser),
            headers: {
                "content-type": "application/json"
            }


        })
        const data = await response.json()
        if (data.token) {

            localStorage.setItem("token", data.token)
            if (data.user.role == "admin") {
                history.push("/class")
            }
            else {
                history.push('/student')
            }
        }
        else {

            setError(data.message)
        }


    }

    return (
        <>
            {['md'].map((expand) => (
                <Navbar key={expand} expand={expand} bg="primary" data-bs-theme="dark">

                    <Navbar.Brand href="/">
                        <img
                            src="https://scontent.fsxv1-1.fna.fbcdn.net/v/t39.30808-6/225361532_226462172741430_8791264933502929167_n.png?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5ICAfIp-tL8AX86VWyj&_nc_ht=scontent.fsxv1-1.fna&oh=00_AfDlbRd2osSILfsjSWsQQyuDYkZbllwkKXZNtELA0n4tOg&oe=64AB8686"

                            style={{ width: '60px', height: '40px', ObjectFit: 'contain', margin: "5px" }}

                            alt=" logo"
                        />
                    </Navbar.Brand>

                    <Navbar.Brand href="/" style={{ fontWeight: "bold" }}>Zen Class</Navbar.Brand>


                </Navbar>))}



            <Row sm={1} md={1} lg={1} xl={1}
                style={{ textAlign: "center" }}>

                <Form onSubmit={handleSubmit}
                    style={{ display: "grid", placeItems: "center", marginTop: "50px", }}
                >

                    <Col style={{ textAlign: "center", width: '30%', margin: "5px" }}  >
                        <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                            <Form.Label style={{ display: "flex", alignItmes: "start" }}>Email</Form.Label>
                            <Form.Control style={{ textAlign: "center", borderRadius: "20px" }}
                                type="email"
                                placeholder="Example:johndue@gmail.com"
                                value={values.email}
                                name='email'
                                onBlur={handleBlur}
                                onChange={handleChange} /> </Form.Group></Col>

                    <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "5px" }}>
                        {touched.email ? errors.email : ""}</Col>

                    <Col style={{ textAlign: "center", width: '30%', margin: "5px" }} variant="success" >
                        <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                            <Form.Label style={{ display: "flex", alignItmes: "start" }}>Password</Form.Label>
                            <Form.Control type="password" placeholder="Your Password"
                                style={{ textAlign: "center", borderRadius: "20px" }}
                                value={values.password}
                                name='password'
                                onBlur={handleBlur}
                                onChange={handleChange}
                            /></Form.Group> </Col>

                    <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "5px" }}>
                        {touched.password ? errors.password : ""}</Col>


                    <Col style={{ margin: "5px" }}><Button type='submit'>Login</Button>
                    </Col>


                    {error ? <Col style={{ textAlign: "center", width: '30%', margin: "5px" }}
                    ><Form.Control style={{
                        Color: "crimson"
                        , fontWeight: "bold", textAlign: "center"
                    }}
                        placeHolder={error} /></Col> : " "}


                </Form>

                <Col >Don't have account?<a href='/signin' >Sign in</a>
                </Col>
            </Row>

        </>
    )
}

export default Login