import React, { useEffect, useState } from 'react'
import Base from './base'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Row, Card, Col, Button } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import Studentbase from './base'
import Reactpaginate from 'react-paginate'



function Studentclass() {

  const [classes, setClasses] = useState([])

  const [pagenumber, setPagenumber] = useState(0)
  const usersperpage = 1
  const pagesVisted = pagenumber * usersperpage


  const pageCount = Math.ceil(classes.length / usersperpage)

  const changePage = ({ selected }) => {
    setPagenumber(selected)
  }



  const history = useHistory()
  let tok = localStorage.getItem("token")

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/", { replace: true })

    }
    let token = localStorage.getItem("token")

    async function getAllData() {
      const response = await fetch("https://zenevent-be.onrender.com/api/topics", {
        method: 'GET',
        headers: {
          "x-auth-token": token
        }

      })

      const data = await response.json()
      if (data.topics) {
        setClasses(data.topics)


      }
      else {

        console.log(data.message)
      }



    }
    getAllData()
  }, [])






  return (


    <Studentbase>


      <Row md={2} lg={2} xl={2} style={{ margin: "20px" }}>

        <Col style={{ display: "grid", placeItems: "center", gap: "10px" }} md={6} lg={7}>
          <div style={{
            height: "50px", width: "100%", backgroundColor: "blue"
            , padding: "10px", borderRadius: "10px"
          }}>
            <Button onClick={() => history.push(`/register/${tok}`)}
              variant="success" size="sm">Join the class</Button>
          </div>


          {classes.slice(pagesVisted, pagesVisted + usersperpage).map((t, id) => (

            <Card key={id} style={{ width: '70%' }}>

              <Card.Body>

                <Card.Title style={{ color: 'blue' }}>{t.topics} </Card.Title>
                <Card.Text>
                  {t.topicdate}
                </Card.Text><hr />
                <Card.Text>
                  {t.content}
                </Card.Text><hr />
                <Card.Text>
                  {t.preread}
                </Card.Text><hr />


              </Card.Body>

            </Card>



          ))}
        </Col>

        <Col md={6} lg={5} style={{ marginTop: "1px" }}>

          <Card style={{ padding: "10px" }} >
            <div style={{ marginBottom: "10px" }}>Sessions Roadmap </div>
            <hr />
            <div style={{ width: "100%" }}>
              <Reactpaginate

                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName='paginationBttns'
                previousLinkClassName='previousBttn'
                nextLinkClassName='nextBttn'
                disabledClassName='paginationDisabled'
                activeClassName='paginationActive'

              />

            </div>
          </Card>

        </Col>
      </Row>

    </Studentbase>

  )
}

export default Studentclass


