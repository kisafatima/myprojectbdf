import React from 'react';
import {useNavigate } from 'react-router-dom'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
import {useEffect, useState} from 'react'
import { GoogleApiWrapper } from 'google-maps-react';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Request from './request';

function Places(props){
    const navigate=useNavigate();
    const [office, setOffice]=useState();
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete();
      const handleSelect =async (e)=>{
        const val=e.target.__reactProps$y5ar03eohig.children;
          console.log(val)
            setValue(val, false)
            clearSuggestions();
            const results=await getGeocode({address:val})
            const {lat, lng}= await getLatLng(results[0])
            console.log({lat, lng})
            setTimeout(() => {
                <Request position={results[0]} />
                navigate('/request'); //this.props.navigation.navigate('Login')
            }, 1000);
      }
        return(
            
            <div className='places'>
                <Form.Group className="mb-3 searchtag" controlId="formGridEmail">
                   
                    <Form.Control type="text" 
                    value={value}
                    onChange={e=>setValue(e.target.value)}
                    placeholder="Search an Address"
                    disabled={!ready}
                    />
                </Form.Group>

                <ListGroup >
                {status === "OK" &&
                    data.map(({ place_id, description }) => (
                    <ListGroup.Item action onClick={(e)=>handleSelect(e)}  key={place_id} value={description} >
                        {description}
                    </ ListGroup.Item>
                ))}
                </ListGroup>
                
    
            </div>
        )
        
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCrQ1FTcXaMpac1SxSfPv10Xi0Kys6Ko-Q')
})(Places)
