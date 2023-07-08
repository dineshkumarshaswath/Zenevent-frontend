import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar'
import { Row, Col, FormControl, Button, Form } from 'react-bootstrap'




function Allattendance(){

    const[attend,setAttend]=useState()

    const[search,setSearch]=useState("")

    const history=useHistory()
    console.log(search)

    useEffect(()=>{
        if(!localStorage.getItem("token")){
            history.push("/"),{replace:true}
        }

        let token=localStorage.getItem("token")
        async function getAttendance(){
            const response=await fetch("https://zenevent-be.onrender.com/api/allattend",{
                method:"GET",
                headers:{
                    "x-auth-token":token
                }
              
            })
            const data=await response.json()
            if(data){
                
                setAttend(data.allstudents)
               

            }
            else{
                console.log(data.message)
            }

        }
        getAttendance()
    })
    return(
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

         

       

<div style={{margin:"50px"}}>
<h1>Students Attendance</h1>

<Row sm={1} md={1} lg={1} xl={1}
      style={{ textAlign: "center",display:'grid',placeItems:"center" }}>

    

        <Col style={{ textAlign: "center", width: '50%', margin: "10px" ,
         }}  > 
      
          <Form.Control style={{ textAlign: "center", borderRadius: "10px" }}
            type="text"
            placeholder="Find student"
            value={search}

           

         
            onChange={(e)=>setSearch(e.target.value)} /></Col></Row>

        <Table striped bordered hover variant="secondary" responsive  >
        <thead >
          <tr>
            <th>S.No</th>
             <th>Name</th>
              <th>Date</th>
           
          </tr>
        </thead>
        <tbody>
            {attend && attend.length>0?

            attend.filter((data)=>{
               return search.toLowerCase() == " "? data:data.name.toLowerCase().includes(search)
            }).map((a,id)=>{
                return(
                  <tr key={id} >
                  <td> {id+1} </td>
                  <td>{a.name}</td>
                  <td>{a.date}</td> 
                  
                  
                </tr>)}

            ):"no data is here"}
        
        </tbody>
      </Table>

     </div>
     </>
    )
  
    
}

export default Allattendance