import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { BiEditAlt } from "react-icons/bi";
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import {db} from '../config/firebase'
import { doc, updateDoc } from "firebase/firestore/lite";
import { useAuth } from '../config/firebase';
import Geocode from "react-geocode";
const mapStyles = {
    width: '90%',
    height: '70%',
    left: '5%'
};

export class MapContainer extends Component {
    
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        currentLocation: {}
    };
    constructor(props) {
        super(props);
        this.confirmAddress = this.confirmAddress.bind(this);
        this.handleCurrentLocation=this.handleCurrentLocation.bind(this);
    }
    componentDidMount() {
        this.handleCurrentLocation();
        
    }
    
    onMarkerDragEnd=(coord)=>{
        const { latLng } = coord;
        const lt = latLng.lat();
        const lg = latLng.lng();
        console.log(lt, lg)
        console.log(this.state.currentLocation.lat)
        this.setState({
            currentLocation: {
                lat: latLng.lat(),
                lng: latLng.lng()
            }
        });
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
    
    searchLoc =() =>{
        console.log("Chal....")
    }

    confirmAddress= async (event)=> {
        event.preventDefault();
        const navigate=this.props.navigate;
        const uid=this.props.uid;
        // console.log(this.state.area)
         await updateDoc(doc(db,"user-registeration",uid),{
           
            Address: event.target.elements[0].value,
            Position: this.state.currentLocation
      
        }).then(function (res) {
            alert("Thank you! Your Location has been saved")
            navigate('/')
          }).catch(function (err) {
            alert(err);
          })
          
          
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
            var lt=position.coords.latitude;
            var lg= position.coords.longitude
        // console.log("Position=>", position)

        Geocode.setApiKey("AIzaSyCrQ1FTcXaMpac1SxSfPv10Xi0Kys6Ko-Q");

        Geocode.setLanguage("en");

        Geocode.setRegion("es");

        Geocode.setLocationType("ROOFTOP");

        // Enable or disable logs. Its optional.
        Geocode.enableDebug();
        
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
                // console.log(area, city, state, country);
                self.setState({
                    address: response.results[0].formatted_address,
                    // area:area
                })
            },
            (error) => {
                console.error(error);
            }
        );
        
        // Get formatted address, city, state, country from latitude & longitude when
        // Geocode.setLocationType("ROOFTOP") enabled
        // the below parser will work for most of the countries
        
        // Geocode.fromLatLng(lt,lg).then(
        //     (response) => {
        //         const address = response.results[0].formatted_address;
        //         let city, state, country;
        //         for (let i = 0; i < response.results[0].address_components.length; i++) {
        //             for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
        //                 switch (response.results[0].address_components[i].types[j]) {
        //                     case "locality":
        //                         city = response.results[0].address_components[i].long_name;
        //                         break;
        //                     case "administrative_area_level_1":
        //                         state = response.results[0].address_components[i].long_name;
        //                         break;
        //                     case "country":
        //                         country = response.results[0].address_components[i].long_name;
        //                         break;
        //                 }
        //             }
        //         }
        //         console.log(city, state, country);
        //         console.log(address);
        //     },
        //     (error) => {
        //         console.error(error);
        //     }
        // );
            
             });
            
       
    }
    
        
       


     

    render() {
        return (

            <div className="map" > 
            <Card className="mapcard" style={{width: '90%', textAlign: 'left'}}>
                {/* <h3>Request a Donor Nearby:
                </h3> */}

                {/* <h6>coordinates({this.state.currentLocation.lat} , {this.state.currentLocation.lng})</h6> */}
                <Form onSubmit={this.confirmAddress} >
                
                <Form.Group className="mb-3" controlId="formGridEmail">
                <Form.Label>Your Current Location:</Form.Label>
                <Form.Control  type="text" name="location" value={`${this.state.address}`}  required 
                onClick={this.searchLoc}
                />
                </Form.Group>
                
                <div className="d-grid  mb-3">
                <Button variant="danger" type="submit"  >
                Confirm Location
                </Button>
                </div>
                </Form>
            </Card>
            {/* <div><p>{this.state.currentLocation.lat}, {this.state.currentLocation.lng}</p></div> */}
                <div className="mapdiv">
               <Map google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    center={this.state.currentLocation}
                     onClick={this.onMapClicked}
                    >
                        <Marker onClick={this.onMarkerClick}
                            position={this.state.currentLocation} 
                            draggable={true} 
                            onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
                            />
                    

                </Map> 
                </div>
            
                    
            </div>
            


        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCrQ1FTcXaMpac1SxSfPv10Xi0Kys6Ko-Q')
})(MapContainer)

//Sanakikey
//AIzaSyCrQ1FTcXaMpac1SxSfPv10Xi0Kys6Ko-Q
//NewKey=> 