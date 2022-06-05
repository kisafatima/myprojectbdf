import {app, auth, db, useAuth} from '../../config/firebase'
import { doc, getDoc } from "firebase/firestore/lite";


const set_user=(uid) =>{
    return (dispatch)=>{
        getDoc(doc(db,"user-registeration",uid))
        .then(
            (doc) => {
                if (doc.exists) {
                    const fname=doc.data().FirstName;
                    const lname=doc.data().LastName;
                   const userdata = {
                    email:doc.data().Email ,
                    uname:fname.concat(' ', lname),
                    age:doc.data().Age,
                    bloodgrp:doc.data().BloodGroup,
                    contact:doc.data().ContactNo,
                    gender:doc.data().Gender,
                    address:doc.data().Address,
                   } 
                   dispatch ({type: "SETUSER", payload: userdata})
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
}

export {set_user}
