import React, { useState } from 'react'
import { Col, Form,Navbar,Button } from 'react-bootstrap'


import zenimage from "../Images/zenclass.png"
import * as yup from 'yup'
import { useFormik } from 'formik'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


//schema for the forgotpassword

const forgotSchema = yup.object({
  email: yup.string().required("* required").min(15, 'minimum 15 characters required'),


})

function Forgotpassword() {


  const [error, setError] = useState()
  const [message, setMessage] = useState()

  //here is the formik  validatieon

  const { handleSubmit, handleChange, values, handleBlur, touched, errors } = useFormik({
    initialValues: {
      email: "",


    },
    validationSchema: forgotSchema,
    onSubmit: (user) => {

      handleClick(user)
    }

  })


  //function for forgot password 
  
  async function handleClick(user) {



    const response = await fetch("https://zenevent-be.onrender.com/api/forgot", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json"
      }

    })



    const data = await response.json()
    console.log(data)
    if (data.error) {
      setError(data.error)
    }
    else if (data.message) {

      alert(data.message)
    }



  }

  return (
    <>
      <Row>
      {['md'].map((expand) => (
                <Navbar key={expand} expand={expand} bg="primary" data-bs-theme="dark">

                    <Navbar.Brand href="/">
                        <img
                            src={zenimage}
                            style={{ width: '60px', height: '40px', ObjectFit: 'contain', margin: "5px" }}

                            alt=" logo"
                        />
                    </Navbar.Brand>

                    <Navbar.Brand href="/" style={{ fontWeight: "bold" }}>Zen Class</Navbar.Brand>


                </Navbar>))}
      </Row>




      <Row
        sm={1} md={1} xs={1} lg={1} style={{marginTop:"30px",width:"100%" ,textAlign:"center", 
        }} >
      
              <h2 style={{marginTop:"10px",fontWeight:"bolder" ,textAlign:"center", 
        }}>Forgot password</h2>
           
              <Form onSubmit={handleSubmit} style={{width:"100%",display:"grid",placeItems:"center"}}>
              <Col style={{ width: "60%", textAlign: "center" ,marginTop:"10px"}} >
              <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
           <Form.Label style={{ display: "flex", alignItmes: "start" }}>Email</Form.Label>
               
                <Form.Control 
                

                  type="email"
                  placeholder="Example:johndue@gmail.com"
                  value={values.email}
                  name='email'
                  onBlur={handleBlur}
                  onChange={handleChange} /></Form.Group>
                   </Col>
                <Col>
                <div style={{ color: "crimson" }}>
                  {touched.email ? errors.email : ""}
                </div>
                </Col>
        
                {error ?
                  <Form.Control style={{
                    margin: "10px",
                    Color: "crimson"
                    , fontWeight: "bold", textAlign: "center"
                  }}
                    placeHolder={error} /> : " "}


                <Button variant="success" type='submit' style={{ marginTop: "10px" }}>submit</Button>
              </Form>
            
       



      </Row>
    </>

  )
}

export default Forgotpassword