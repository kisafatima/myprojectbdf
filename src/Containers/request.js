import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import { Link, Route  } from 'react-router-dom';
// import Link from 'react-bootstrap/Link';
import Row from 'react-bootstrap/Row'
import { Map, Marker, GoogleApiWrapper, Circle, DirectionsRenderer } from 'google-maps-react';
import MyNav from './nav'
import { collection, query, where, getDocs } from "firebase/firestore";
import {app} from '../config/firebase'
import { doc} from "firebase/firestore/lite";
import {getFirestore} from 'firebase/firestore'
import Modal from 'react-bootstrap/Modal'
import { BiSearchAlt } from "react-icons/bi";
import Places from './places'
// import { io } from 'socket.io-client';
import logo5 from '../Logo/logo5.png'

import Geocode from "react-geocode";
const mapStyles = {
    width: '90%',
    height: '70%',
    left: '5%'
};
const options= {
    disableDefaultUI:true,
    clickableIcons: false
}
const circleOptions = {
    
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable:false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: "#FF5252",
    fillColor: "#FF5252",
    
   
  }
  

export class Request extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        currentLocation: {},
        data:[],
        donorsPosition: [],
        uids:[],
        request:null,
        direction: null,
        
        socket:null
    };
    constructor(props) {
        super(props);
        this.handleCurrentLocation=this.handleCurrentLocation.bind(this);
        this.requestDonor = this.requestDonor.bind(this);
        
    }
    componentDidMount() {
        this.handleCurrentLocation();
        // this.setState({
        //        socket: io("http://localhost:5000")
        //     });
    }
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }

    };
    
    setLgShow=()=>{
        this.setState({
        lgShow:false,
        data:[]
        })
    }

    fetchDirection = (position) =>{
        const service= new this.props.google.maps.DirectionsService();
        service.route({
            origin: position,
            destination: this.state.currentLocation,
            travelMode: this.props.google.maps.TravelMode.DRIVING
        },
        (result, status)=>{
            if(status=='OK' && result){
                this.setState({
                   direction:result
                    })
            }
        }
        )
    }

    requestDonor= async (event)=> {
        event.preventDefault();
        
        const uid=window.user;
        const bg=event.target.elements[1].value;
        const dbb=getFirestore(app);
        const colRef =collection(dbb, "user-registeration");
        let q;
        switch(bg){
            case "A+":
                q = query(colRef, where("BloodGroup", "in", ["A+", "A-", "O+", "O-" ]));
                break;
            case "O+":
                q = query(colRef, where("BloodGroup", "in", [ "O+", "O-" ]));
                break;
            case "B+":
                q = query(colRef, where("BloodGroup", "in", ["B+", "B-", "O+", "O-" ]));
                break;
            case "AB+":
                q = query(colRef, where("BloodGroup", "in", ["AB+","AB-", "A+", "A-","B+", "B-", "O+", "O-" ]));
                break;
            case "A-":
                q = query(colRef, where("BloodGroup", "in", [ "A-", "O-" ]));
                break;
            case "O-":
                q = query(colRef, where("BloodGroup", "in", [ "O-" ]));
                break;
            case "B-":
                q = query(colRef, where("BloodGroup", "in", ["B-", "O-" ]));
                break;
            case "AB-":
                q = query(colRef, where("BloodGroup", "in", ["AB-", "A-", "B-", "O-" ]));
                break;
            default:
                console.log("No Blood Group Selected")
        
       }
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
            if(uid!==doc.data().UserId)
            {
            let name=doc.data().FirstName;
            let { donorsPosition, donor } = this.state;
            let { data, mydata } = this.state;
            let {uids, recieveruid}=this.state;

            donor=doc.data().Position;
            donorsPosition.push(donor)
            
            mydata=name.concat(" ", doc.data().BloodGroup," ", doc.data().ContactNo, "\n");
            data.push(mydata)
            
            recieveruid=doc.data().UserId;
            uids.push(recieveruid);
            }
            // this.setState({
            //      data.push(mydata)
            // })
        // doc.data() is never undefined for query doc snapshots
        // console.log( doc.data().FirstName, " ", doc.data().BloodGroup, doc.data().ContactNo, "  ");
        
        }
        
        );
        console.log("Data=> ", this.state.data)
        console.log("Position", this.state.donorsPosition[0])
        console.log("UIDS", this.state.uids)
        
        this.setState({
            // lgShow:true
            request:true
            })

            
        // this.state.socket.emit("sendNotification",{
        //     senderId: uid,
        //     receiverId: this.state.uids[0],
        //     bloodGrp: bg
        // })

        //    let a= new this.props.google.maps.LatLng(this.state.currentLocation.lat, this.state.currentLocation.lng);
        //    let b=new this.props.google.maps.LatLng(this.state.donorsPosition[0].lat, this.state.donorsPosition[0].lng);
            
        //     let distance=new this.props.google.maps.geometry.spherical.computeDistanceBetween(a,b);
        //     console.log(distance)

        
        // this.setLgShow(true)
        //   console.log(email,event.target.elements[0].value, event.target.elements[1].value);
         
        }

    onMarkerDragEnd=(coord)=>{
            const { latLng } = coord;
            const lt = latLng.lat();
            const lg = latLng.lng();
            console.log(this.state.currentLocation.lat, this.state.currentLocation.lng)
            this.setState({
                currentLocation: {
                    lat: latLng.lat(),
                    lng: latLng.lng()
                }
            });
            console.log(this.state.currentLocation.lat, this.state.currentLocation.lng)
            Geocode.fromLatLng(lt,lg).then(
                (response) => {
                    let city, state, country, area;
                    for (let i = 0; i < response.results[0].address_components.length; i++) {
                        for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                            // console.log(response.results[0].address_components[i].types[j])
                            switch (response.results[0].address_components[i].types[j]) {
                                case "sublocality":
                                    area = response.results[0].address_components[i].long_name;
                                    break;
                                case "locality":
                                    city = response.results[0].address_components[i].long_name;
                                    break;
                                case "administrative_area_level_1":
                                    state = response.results[0].address_components[i].long_name;
                                    break;
                                case "country":
                                    country = response.results[0].address_components[i].long_name;
                                    break;
                            }
                        }
                    }
                    // console.log(area, city, state, country);
                    this.setState({
                        address: response.results[0].formatted_address,
                        area:area
                    })
                },
                (error) => {
                    console.error(error);
                }
            );
            
        }

    handleCurrentLocation = async () => {
        const self = this;
        navigator.geolocation.getCurrentPosition(function (position) {
            self.setState({
                currentLocation: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            });
        // console.log("Position=>", position)

        Geocode.setApiKey("AIzaSyCrQ1FTcXaMpac1SxSfPv10Xi0Kys6Ko-Q");

        Geocode.setLanguage("en");

        Geocode.setRegion("es");

        Geocode.setLocationType("ROOFTOP");

        // Enable or disable logs. Its optional.
        Geocode.enableDebug();
        
        var lt= position.coords.latitude;
        var lg=  position.coords.longitude;
        // console.log("lt LG=>",lt, lg)
        
        // Get address from latitude & longitude.
        Geocode.fromLatLng(lt,lg).then(
            (response) => {
                let city, state, country, area;
                    for (let i = 0; i < response.results[0].address_components.length; i++) {
                        for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                            // console.log(response.results[0].address_components[i].types[j])
                            switch (response.results[0].address_components[i].types[j]) {
                                case "sublocality":
                                    area = response.results[0].address_components[i].long_name;
                                    break;
                                case "locality":
                                    city = response.results[0].address_components[i].long_name;
                                    break;
                                case "administrative_area_level_1":
                                    state = response.results[0].address_components[i].long_name;
                                    break;
                                case "country":
                                    country = response.results[0].address_components[i].long_name;
                                    break;
                            }
                        }
                    }
                self.setState({
                    address: response.results[0].formatted_address
                    
                })
            },
            (error) => {
                console.error(error);
            }
        );
        
            
             });
            
       
    }
     
        


    render() {
   
        return (

            <div className="map"> 
            <MyNav />
            <Card className="mapcard" style={{width: '90%', textAlign: 'left'}}>
                {/* <h3>Request a Donor Nearby:
                </h3> */}

                {/* <h6>coordinates({this.state.currentLocation.lat} , {this.state.currentLocation.lng})</h6> */}
                <Form onSubmit={this.requestDonor} >
                <Row className="su-title" >
                <div>REQUEST A DONOR</div>
        
                </Row>
                <Form.Group className="mb-3" controlId="formGridEmail">
                <Form.Label>Recipient's Location:</Form.Label>
                <div className='search'>
                <Form.Control  type ="text" name="location" value={`${this.state.address}`}  required >
                    
                </Form.Control>

                {/* <button className='searchicon' >
                <Link to={{pathname: '/places'}} className='link-danger'><BiSearchAlt /></Link>
                    
                    </button> */}
                
                </div>

                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridEmail">
                <Form.Label>Required Blood Type:</Form.Label>
                <Form.Select defaultValue={"Select"} style={{fontSize: "14px"}}  name="Blood Group" required>
                <option value="Select"  disabled>Select.. </option>
                <option>A+</option>
                <option>A-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                </Form.Select>
                </Form.Group>
                <div className="d-grid  mb-3">
                <Button variant="danger"  type='submit' >
                Proceed Request
                </Button>
                </div>
                </Form>
            </Card>
            <Modal
        size="lg"
        show={this.state.lgShow}
        onHide={this.setLgShow}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
          Donors who can donate you the Blood 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{whiteSpace:'pre-line'}}>{this.state.data}</Modal.Body>
      </Modal>
                <div className="mapdiv">
               <Map google={this.props.google}
                    center={this.state.currentLocation}
                    zoom={14}
                    style={mapStyles}
                    options={options}
                     onClick={this.onMapClicked}

                    >
                        {this.state.direction && <DirectionsRenderer directions={this.state.direction}  />}



                        <Marker onClick={this.onMarkerClick}
                            draggable={true}
                            position={this.state.currentLocation}
                            onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}  
                        />

                        {this.state.request && this.state.donorsPosition.map((v,i)=>{
                           return  <Marker key={i} position={{lat:v.lat, lng:v.lng}} 
                           icon={{url:logo5,  scaledSize:new this.props.google.maps.Size(40,30) }}
                        //    onClick={()=>this.fetchDirection(v)}
                           />
                        })}
                    <Circle
                  center={this.state.currentLocation}
                  radius={1500}
                  strokeColor={"#d33115"}
                  fillColor={"#d33115"}
                  strokeWeight={1}
                  fillOpacity={0.15}
                  options={circleOptions}
                />

                </Map> 
                </div>
            
               
            </div>
            


        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCrQ1FTcXaMpac1SxSfPv10Xi0Kys6Ko-Q')
})(Request)


// AIzaSyA8GSLEwOCybJ-uQAb2vKxbeSE9CjwmStw