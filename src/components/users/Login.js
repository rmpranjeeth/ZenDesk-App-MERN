import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import env from '../../enviroinment'
import {useNavigate,Link} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import background from '../assets/wave-haikei.svg';


function Login() {
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let [toggle,setToggle]=useState(false)
  let [message,setMessage]=useState("")
  let navigate = useNavigate()

  let handleLogin =  async ()=>{
    setToggle(true)
    let res = await axios.post(`${env.apiurl}/users/login`,{
      email,
      password
    })
    if(res.data.statusCode===200)
    {
        setToggle(false)
       sessionStorage.setItem('token',res.data.token)
       sessionStorage.setItem('role',res.data.role)
       sessionStorage.setItem('userId',res.data.userId)
       if(res.data.role==="admin")
          navigate('/dashboard')
       else
          navigate('/user-dashboard')   
    }
    else
    {
      setToggle(false)
      setMessage(res.data.message)
      setTimeout(()=>{
        setMessage("")
        setEmail("")
        setPassword("")
      },3000)

    }
  }
  return <>
  <header style={ HeaderStyle }>
  <div className="signup-wrapper mt-5">
      <h1>Welcome to ZenDesk</h1>
      <h3 className='mt-3'>Login</h3>
    </div>
    <div className='d-flex justify-content-center mt-4'>
      <Form className='col-sm-8 col-md-4'>
        <Form.Group className="mb-3">
          <Form.Label><MailOutlineIcon/> Email</Form.Label>
          <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><VpnKeyOutlinedIcon/> Password</Form.Label>
          <Form.Control type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>

        <div className='text-end'><Link> Forgot Password?</Link></div>

        <div className='text-center mt-3'>
          <Button className="rounded-pill" variant="primary" style={{"width":"150px"}} onClick={()=>handleLogin()}>
            LOGIN
          </Button>

          <p className='mt-2'>Don't have an account?<Link to='/signup'> Sign Up</Link></p>
          <p className='mt-2'>For Quick Complaints? Click<Link to='/new-complaint'> here</Link></p>
        </div>
      </Form>
    </div> 
    <div className='d-flex justify-content-center'>
      {toggle?<Spinner animation="border" variant="primary" />:<></>}
      {message?<div style={{"color":"red","textAlign":"center","fontWeight":"bold"}}>{message}</div>:<></>}
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