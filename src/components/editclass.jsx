import React, { useEffect, useState } from 'react'
import { Row, Col, FormControl, Button, Form } from 'react-bootstrap'

import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Adminbase from './adminbase';
import * as yup from 'yup'
import { useFormik } from 'formik';

const createclassSchema = yup.object({
  topics: yup.string().required("* Topic required").min(10, " Minimum  15 characters required"),
  topicdate: yup.string().required("* Topicdate required").min(10, " Minimum  10 characters required"),
  content: yup.string().required("*Content required").min(10, " Minimum  15 characters required"),
  preread: yup.string().required(" * preread requird").min(5, " Minimum    5 characters required"),
})


function Editclass({ classes, setClasses }) {

  const history = useHistory()
  const { id, token } = useParams()


  const a = classes.find((data) => data._id == id)



  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      topics: a.topics,
      topicdate: a.topicdate,
      content: a.content,
      preread: a.preread
    },
    validationSchema: createclassSchema,
    onSubmit: (editclass) => {
      console.log(editclass);
      editclassChange(editclass)
    }
  })

  async function editclassChange(editclass) {



    const response = await fetch(`https://zenevent-be.onrender.com/api/edit/${a._id}`, {
      method: 'PUT',
      body: JSON.stringify(editclass),
      headers: {
        "x-auth-token": token,
        "content-type": "application/json"
      }

    })

    const data = await response.json()
    console.log(data);
    if (data.message == 'successfully updated') {
      // const userindex = classes.findIndex((data, idx) => idx == id)
      // console.log(userindex)

      const b = a._id
      console.log(b)
      classes[b] = editclass
      setClasses(classes);
      history.push("/class")
    }
    else {

      console.log("it is not updated")
    }




  }

  return (



    <Adminbase>

      <Row sm={1} md={1} lg={1}>

        <Form onSubmit={handleSubmit} style={{ display: "grid", placeItems: "center", marginTop: "20px" }} >
          <Col style={{ textAlign: "center", width: '50%' }} variant="success"  >

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Topics</Form.Label>
              <Form.Control
                type="text" placeholder="Enter topics"
                value={values.topics} onChange={handleChange}
                onBlur={handleBlur}
                name="topics"
              />
            </Form.Group></Col>

          <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "10px" }}>
            {touched.topics ? errors.topics : ""}</Col>

          <Col style={{ textAlign: "center", width: '50%' }} variant="success"  >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Topic date</Form.Label>
              <Form.Control
                type="text" placeholder="Date & Time"
                value={values.topicdate} onChange={handleChange}
                onBlur={handleBlur}
                name="topicdate"
              />
            </Form.Group></Col>
          <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "10px" }}>
            {touched.topicdate ? errors.topicdate : ""}</Col>


          <Col style={{ textAlign: "center", width: '50%' }} variant="success"  >
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>content</Form.Label>
              <Form.Control as="textarea" rows={3}
                type="text" placeholder="Date & Time"
                value={values.content} onChange={handleChange}
                onBlur={handleBlur}
                name="content" />

            </Form.Group></Col>

          <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "10px" }}>
            {touched.content ? errors.content : ""}</Col>

          <Col style={{ textAlign: "center", width: '50%' }} variant="success"  >
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Preread</Form.Label>
              <Form.Control as="textarea" rows={3}
                type="text" placeholder="Preread sites"
                value={values.preread} onChange={handleChange}
                onBlur={handleBlur}
                name="preread" />
            </Form.Group></Col>
          <Col style={{ color: 'crimson', textAlign: "center", width: '30%', margin: "10px" }}>
            {touched.preread ? errors.pr : ""}</Col>

          <Col><Button type="submit" variant='success'>Edit class</Button></Col>


        </Form>

      </Row>
    </Adminbase>

  )
}
export default Editclass

