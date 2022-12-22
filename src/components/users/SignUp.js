import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import env from '../../enviroinment'
import {Link} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import background from '../assets/wave-haikei.svg';


function Login() {
  let [firstName,setFirstName]=useState("")
  let [lastName,setLastName]=useState("")
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let [toggle,setToggle]=useState(false)
  let [message,setMessage]=useState("")

  let handleSignup =  async ()=>{
    setToggle(true)
    let res = await axios.post(`${env.apiurl}/users/signup`,{
      firstName,
      lastName,
      email,
      password
    })
    if(res.data.statusCode===200)
    {
      setToggle(false)
      setMessage(res.data.message)   
    }
    else
    {
      setToggle(false)
      setMessage(res.data.message)
    }
  }
  return <>
  <header style={ HeaderStyle }>
    <div className="signup-wrapper mt-5">
      <h1>Welcome to ZenDesk</h1>
      <h3 className='mt-3'>Sign Up</h3>
    </div>
    <div className='d-flex justify-content-center mt-4'>
      <Form className='col-sm-8 col-md-4'>
      <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="string" value={firstName} placeholder="Enter your first name" onChange={(e)=>setFirstName(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="string" value={lastName} placeholder="Enter your last name" onChange={(e)=>setLastName(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
         <Form.Check type="checkbox" label="I agree the Terms & Conditions" />
        </Form.Group>

        <div className='text-center mt-3'>
          <Button className="rounded-pill" variant="primary" style={{"width":"150px"}} onClick={()=>handleSignup()}>
            SIGNUP
          </Button>

          <p className='mt-2'>Already have an account?<Link to='/login'> Login</Link></p>
        </div>
      </Form>
    </div> 
    <div className='d-flex justify-content-center'>
      {toggle?<Spinner animation="border" variant="primary" />:<></>}
      {message?<div style={{"color":"red","textAlign":"center","font-weight":"bold"}}>{message}</div>:<></>}
    </div> 
    </header>
  </>
}

const HeaderStyle = {
  height: "100vh",
  background: `url(${background})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
}

export default Login