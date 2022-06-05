// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
// import React from 'react';
// import {Link } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../App.css'
// import App from '../App';
// import logo5 from '../Logo/logo5.png'
// import Home from './home';
// import {useNavigate } from 'react-router-dom'
// import { authlogin } from '../config/firebase';
// import {connect} from 'react-redux';
// import {set_data} from '../store/action';


// function GetOtp(){
//     let navigate=useNavigate();
//     async function checkOtp(event){
    
//       event.preventDefault();
      
     
  
      
      
//     }
     
  
//       return(
//           <div className="SignIn" >
//           <Card className="mycard tet-left">
//       <Form autoComplete="on" onSubmit={e=>{checkOtp(e)}}>
//         <Row className="su-title" >
//         <div><img src={logo5} style={{height:'40px', paddingBottom:'5px'}} /></div>
//           <div>Enter OTP</div>
//          </Row>

//       <Form.Group className="mb-3" controlId="formGridEmail">
//         <Form.Label>Email</Form.Label>
//         <Form.Control type="email" placeholder="Enter email" required />
//       </Form.Group>
  
//       <Form.Group className="mb-3" controlId="formGridPassword">
//         <Form.Label  >Password</Form.Label>
//         <Form.Control placeholder="Password" 
        
//         />
    
//       </Form.Group>
    
  
//   <div className="d-grid gap-2 mb-3">
//     <Button variant="danger"  type="submit">
//      Sign In
//     </Button>
//     </div>
  
  
//   </Form> 
//   </Card>
  
  
  
//           </div>
//       )
//   }
  
  
//   export default GetOtp;