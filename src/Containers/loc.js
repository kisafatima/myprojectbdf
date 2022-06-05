import React from 'react';
import {useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../config/firebase';
import MyNav from './nav';
import MapContainer  from "./map";
import Row from 'react-bootstrap/Row';
// import {set_data} from '../store/action';
// import {connect} from 'react-redux';

function ConfirmLoc(){
    const currentUser=useAuth();
    let uid=currentUser?.uid;
    let navigate=useNavigate();
        return(
            
            <div>
               
                
                <br />
                <Row className="su-title" >
                <div>ADDRESS: </div>
                </Row>
                <MapContainer navigate={navigate} uid={uid}/>
                
                
    
            </div>
        )
    
}
// const mapStateToProps=(state)=>({
//   // users :state.users
// })

// const mapDispatchToProps = (dispatch) => ({
//   // set_data: (useremail)=>dispatch(set_data(useremail))
  
// })


export default ConfirmLoc;
