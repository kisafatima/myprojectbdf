import React from 'react';
import {db} from '../config/firebase'
import { doc, getDoc } from "firebase/firestore/lite";
import { useAuth } from '../config/firebase';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import MyNav from './nav';
import '../App.css'
import logo5 from '../Logo/logo5.png'

function Profile(){
    let [userdata, setuserdata] = React.useState({})
    let [show, setShow]= React.useState(null);
    const currentUser=useAuth();
    const uid=currentUser?.uid;

    React.useEffect(() => {
        
        myprofile();
        
        console.log(userdata)
      }, [])


      const myprofile= async() =>{
        // const docRef = db.collection("user-registeration").doc(email);
        await getDoc(doc(db,"user-registeration",uid))
        .then(
            (doc) => {
                if (doc.exists) {
                    const fname=doc.data().FirstName;
                    const lname=doc.data().LastName;
                    window.name=fname.concat(' ', lname);
                    setuserdata(
                        {
                        email:doc.data().Email,
                        name:fname.concat(' ', lname),
                        age:doc.data().Age,
                        bloodgrp:doc.data().BloodGroup,
                        // window.city=doc.data().City,
                        contact:doc.data().ContactNo,
                        gender:doc.data().Gender,
                        address:doc.data().Address,
                        }
                    );
                     setShow(
                         show=true,
                     ) 
                    //  setshowdata(
                    //     showdata=false,
                    //  )
                   
                    console.log("Hello")

                } 
                else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
               
            });
            
        
      

}

      


    return(
        <div className="profile">
            <MyNav />
            <br />
            <div className='cardDiv'>
    <Card border="danger" style={{ width: '18rem' }} 
    onLoad={myprofile}
    >
    {/* <Card.Header  bg="danger">Account Details</Card.Header> */}
    <Card.Body>
      <Card.Title>
      <Row className="su-title" >
      <div><img src={logo5} style={{height:'40px'}} /></div>
       
                <div>MY ACCOUNT</div>
               </Row>
      </Card.Title>
      { show ? 
      <div >
      <Card.Text >
     <b> Name: </b> {`${userdata.name}`}
      <br />
      
      <b> Email: </b>{`${userdata.email}`}
      <br />

      <b> Age: </b>{`${userdata.age}`}
      <br />
      
      <b> Blood Group: </b>{`${userdata.bloodgrp}`}
      <br />
      
      <b>Gender: </b> {`${userdata.gender}`}
      <br />

      <b>Contact No: </b> {`${userdata.contact}`}
      <br />

      <b>Address: </b> {`${userdata.address}`}
      <br />
{/* 
      <b>City: </b> {`${window.city}`}
      <br /> */}
      

      
      </Card.Text>
      </div> :
       <div >
       <Spinner animation="border"  variant="danger" />
       </div>
    }
    </Card.Body>
  </Card>
  </div>
        </div>
    )
}

export default Profile;