import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Row, Card, Col, Button } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'

import Adminbase from './adminbase'
import Reactpaginate from 'react-paginate'



function Class({ classes, setClasses }) {

    // const[classes,setClasses]=useState([])
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
                setError(data.message)

            }



        }
        getAllData()
    }, [])

    async function handleDelete(id) {
        const res = await fetch(`https://zenevent-be.onrender.com/api/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'x-auth-token': tok
            }

        })
        const data = await res.json()
        if (data.message == "successfully deleted") {
            console.log(data)
            const newclasses = classes.filter((classes, idx) => classes._id !== id)

            setClasses(newclasses)
            console.log(data.message)
        } else {
            console.log("data not deleted")
        }



    }




    return (



        <Adminbase>
            <div style={{ textAlign: "start", fontWeight: "bolder", marginLeft: "30px", marginTop: "20px" }}><h1>class</h1></div>

            <Row xs={1} sm={1} md={1} lg={1}
            >
                {classes.slice(pagesVisted, pagesVisted + usersperpage).map((t, id) => (
                    <Col style={{ display: 'grid', placeItems: "center", gap: "10px", margin: "20px" }}>
                        <Card key={id} style={{ width: '70%' }}>

                            <Card.Body>

                                <Card.Title style={{ color: "blue" }}>{t.topics} </Card.Title>
                                <Card.Text>
                                    {t.topicdate}
                                </Card.Text><hr />
                                <Card.Text>
                                    {t.content}
                                </Card.Text><hr />
                                <Card.Text>
                                    {t.preread}
                                </Card.Text><hr />


                                <Button variant='success' style={{ marginRight: "10px" }}
                                    onClick={() => history.push(`/edit/${t._id}/${tok}`)} >Edit</Button>
                                <Button variant='danger' onClick={() => handleDelete(t._id)}
                                >delete</Button>
                            </Card.Body>

                        </Card>
                    </Col>


                ))}

            </Row>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
        </Adminbase>



    )
}

export default Class



