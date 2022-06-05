import './App.css';
import SignUp from './Containers/SignUp';
import Home from './Containers/home';
import Profile from './Containers/profile'
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router,Link, Routes, Route} from 'react-router-dom';
import SignIn from './Containers/SignIn';
import {db} from './config/firebase'
import ProtectedRoutes from './Routes/protectedroutes';
import Notifications from './Containers/notifications'
import Post from './Containers/post/App'
import MyMap from './Containers/map'
import Request from './Containers/request'
import AboutUs from './Containers/aboutus'
import Faq from './Containers/faq'
import ConfirmLoc from './Containers/loc'
import Places from './Containers/places'
// import { io } from "socket.io-client";
// import GetOtp from './Containers/otp'
import { useAuth } from './config/firebase';

function App(props) {
  
  const current_user=useAuth();
  const userId=current_user?.uid;
  const [user, setUser]=useState("");
  const [socket, setSocket]=useState(null);

  // useEffect(()=>{
  //   setSocket(io("http://localhost:5000"));
      
  //   // console.log(socket.on("firstEvent", (msg)=>{
  //     //   console.log(msg)
  //     // }))

  // }, [])

  // useEffect(()=>{
  //   socket?.emit("newUser",userId)
    
  // }, [socket, userId])



  return (
    <div className="App">
      <Router>
      <Routes>
      {/* <Route element={<PublicRoutes isnotAuth={isAuth}/>} > */}
        { current_user
          ?
           <Route path="/" exact element={<Home />} />
           :
           <Route path="/" exact  element={<SignIn/>} />
        }
       
        <Route path="/signup" exact element={<SignUp db={db} />} />  
       
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/places" exact element={<Places />} />
        <Route path="/post" exact element={<Post />} />
        <Route path="/notifications" exact element={<Notifications />} />
        <Route path="/map" exact element={<MyMap />} />
        <Route path="/request" exact element={<Request />} />
        <Route path="/aboutus" exact element={<AboutUs />} />
        <Route path="/faqs" exact element={<Faq />} />
        <Route path="/loc" exact element={<ConfirmLoc />} />
        {/* <Route path="/otp" exact element={<GetOtp />} /> */}



        {/* </Route>   */}
    
      </Routes>
      </Router>
    </div>
  );
}

    


export default App;
