import React from 'react';
import {useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../config/firebase';
import MyNav from './nav';
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import { BiAddToQueue  } from "react-icons/bi";
import { Link, Route  } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import {useEffect, useState} from 'react'
import {set_user} from '../store/action';
import {connect} from 'react-redux';
import banner1 from '../Images/banner1.jpg'

import logo5 from '../Logo/logo5.png'
import request from '../Images/request.png'
// import { io } from "socket.io-client";


function Home(props){
    const current_user=useAuth();
    const uid=current_user?.uid;

    

    console.log()
    // const [user, setaUser]=useState([]);
    
    // useEffect(()=>{
    //     async function setUser(){
    //         const setUser=await props.set_user(uid);
    //         setaUser(setUser);
    //     }
    //     setUser();
        
    //     console.log("Home=>", props.currentUser)
    // },[]);
            
        return(
            
            <div>
                <MyNav />
                <div className='homediv'>
               <div> 
                <Card className='homecards' border="danger">
                <Card.Body>
                <Card.Title>
                <Row className="su-title" >
                <div>
                 <img src={request} style={{height:'50px', paddingBottom:'5px'}} />
                </div>
       
                <div>REQUEST A DONOR</div>
        
                </Row>
                </Card.Title>
                <Card.Text style={{textAlign:'justify'}}>
                Find a blood Donor nearby in real-time in just a single click!
                </Card.Text>
    <Link to={{pathname: '/request'}}> <Button variant="danger" >Make Request</Button></Link>
  </Card.Body>
</Card>
</div>
<div>
<Card className='homecards' border="danger" >
                <Card.Body>
                <Card.Title>
                <Row className="su-title" >
                <div>
                 {/* <img src={request} style={{height:'50px', paddingBottom:'5px'}} /> */}
                <BiAddToQueue className='homeicon'/>
                </div>
       
                <div>POST</div>
        
                </Row>
                </Card.Title>
                <Card.Text style={{textAlign:'justify'}}>
                Make an appeal for non-emergency cases. As for thalassemia patients.
                </Card.Text>
    <Link to={{pathname: '/post'}}> <Button variant="danger" >Post Now</Button></Link>
  </Card.Body>
</Card>         
</div>

</div>
{/* <div> 
                <Card className='homecards' border="danger">
                <Card.Body>
                <Card.Title>
                <Row className="su-title" >
                <div>
                 <img src={logo5} style={{height:'40px', paddingBottom:'5px'}} />
                </div>
       
                <div>OUR SERVICES</div>
        
                </Row>
                </Card.Title>
                <Card.Text style={{textAlign:'justify'}}>
                Find a blood Donor nearby in real-time in just a single click!
                
                </Card.Text>
    <Link to={{pathname: '/request'}}> <Button variant="danger" >Make Request</Button></Link>
  </Card.Body>
</Card>
</div> */}

            </div>
        )
        
}
// const mapStateToProps=(state)=>({
//     currentUser :state.currentUser
// })

// const mapDispatchToProps = (dispatch) => ({
//     set_user: (uid)=>dispatch(set_user(uid))
  
// })


// export default Home;
export default Home;
