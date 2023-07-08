import React, { useState } from 'react'
import { Row, Col, FormControl, Button, Form } from 'react-bootstrap'
import Base from './base'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import * as yup from 'yup'
import { useFormik } from 'formik'
import Navbar from 'react-bootstrap/Navbar';

const attendanceSchema = yup.object({
  name: yup.string().required("*  Name required"),
  date: yup.string().required("*  Date required")

})


function Registerstdudent() {
  const [error, setError] = useState()

  const history = useHistory()
  const { token } = useParams()

  const { handleSubmit, handleChange, values, handleBlur, touched, errors } = useFormik({
    initialValues: {
      name: "",
      date: "",

    },
    validationSchema: attendanceSchema,
    onSubmit: (newstudent) => {
      console.log(newstudent)
      handleRegister(newstudent)
    }

  })



  async function handleRegister(newstudent) {


    const response = await fetch("https://zenevent-be.onrender.com/api/postattend", {
      method: 'POST',
      body: JSON.stringify(newstudent),
      headers: {
        "x-auth-token": token,
        "content-type": "application/json"
      }

    })

    const data = await response.json()
    if (data) {

      console.log(data);
      history.push("/student")
    }
    else {

      setError(date.message)
    }



  }

  return (
    <>
     {['md'].map((expand) => (
            <Navbar key={expand} expand={expand}  bg="primary" data-bs-theme="dark">
              
              <Navbar.Brand href="/">
                <img
                  src="https://scontent.fsxv1-1.fna.fbcdn.net/v/t39.30808-6/225361532_226462172741430_8791264933502929167_n.png?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5ICAfIp-tL8AX86VWyj&_nc_ht=scontent.fsxv1-1.fna&oh=00_AfDlbRd2osSILfsjSWsQQyuDYkZbllwkKXZNtELA0n4tOg&oe=64AB8686"
    
                 style={{width:'60px',height:'40px',ObjectFit:'contain' ,margin:"5px"}}
                
                  alt=" logo"
                />
              </Navbar.Brand>
               
                <Navbar.Brand href="/"  style={{fontWeight:"bold"}}>Zen Class</Navbar.Brand>
             
                    
                   </Navbar>))}


    <Row sm={1} md={1} lg={1} xl={1}
      style={{ textAlign: "center" }}>

      <Form onSubmit={handleSubmit}
        style={{ display: "grid", placeItems: "center", marginTop: "50px", }}
      >

        <Col style={{ textAlign: "center", width: '30%', margin: "10px" }}  >
          <Form.Control style={{ textAlign: "center", borderRadius: "20px" }}
            type="text"
            placeholder="Your name"
            value={values.name}

            name='name'

            onBlur={handleBlur}
            onChange={handleChange} /></Col>

        <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "10px" }}>
          {touched.name ? errors.name : ""}</Col>

        <Col style={{ textAlign: "center", width: '30%', margin: "10px" }} variant="success" >
          <Form.Control type="date" placeholder="Date" style={{ textAlign: "center", borderRadius: "20px" }}
            value={values.date}
            name='date'
            onBlur={handleBlur}
            onChange={handleChange}
          /> </Col>
        <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "10px" }}>
          {touched.date ? errors.date : ""}</Col>

        <Col style={{ margin: "10px" }}><Button type='submit' variant="secondary">Register</Button>
        </Col>
      </Form>
      {error ? <Col style={{ textAlign: "center", width: '30%', margin: "10px" }}
      ><Form.Control style={{
        Color: "crimson"
        , fontWeight: "bold", textAlign: "center"
      }}
        placeHolder={error} /></Col> : " "}
    </Row>

</>

  )
}
export default Registerstdudent;
