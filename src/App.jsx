import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login'
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Signup from './components/signup';
import Class from './components/class';
import Createclass from './components/createclass';
import Editclass from './components/editclass';
import { useState } from 'react';
import Registerstdudent from './components/registerattendance';
//import StudentClass from './components/studentclass';
//import Sample from './components/studentclass';
import Studentclass from './components/studentclass';
import Allattendance from './components/getattendance';
import Forgotpassword from './components/forgotpass';
import Resetpassword from './components/resetpass';

function App() {

  const [classes, setClasses] = useState([])



  return (



    <Switch>
      <Route exact path="/">
        <Login />
      </Route>

      <Route path='/signin'>
        <Signup />
      </Route>

      <Route path="/forgot">
        <Forgotpassword />
      </Route>

      <Route path="/reset/password/:token">
        <Resetpassword />
      </Route>

      <Route path="/class">
        <Class
          classes={classes}
          setClasses={setClasses}
        />
      </Route>
      <Route path="/createclass">
        <Createclass />
      </Route>

      <Route path="/edit/:id/:token">
        <Editclass
          classes={classes}
          setClasses={setClasses} />
      </Route>

      <Route path='/student'>
        <Studentclass />
      </Route>

      <Route path='/allattendance'>
        <Allattendance />

      </Route>

      <Route path='/register/:token'>
        <Registerstdudent />
      </Route>




    </Switch>

  )
}

export default App
