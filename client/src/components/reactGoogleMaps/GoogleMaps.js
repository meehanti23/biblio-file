import React, { useState } from "react"
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps"
import axios from "axios";

const GoogleMaps = (props) => {
    const [address, setAddress] = useState('');
    const [latAndLong, setLatAndLong] = useState({});
    const [location, setLocation] = useState({ lat: 42.361, lng: -71.057 });
    const [apiKey, setApiKey] = useState('');

    
    const handleAddressSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`/api/v1/googleMaps?address=${encodeURIComponent(address)}`);
            if (response.status === 200) {
                const { lat, lng, location, apiKey } = response.data;
                setLatAndLong({ lat, lng });
                setLocation(location);
            } else {
                throw new Error('An error occurred while searching for zip code.');
            }
        } catch (error) {
            console.error('Error in search:', error);
        }
    };      
    
    const handleAddressChange = (event) => {
      setAddress(event.target.value);
    };
    const center = latAndLong
  
    const MapWithAMarker = withScriptjs(withGoogleMap(props => (
      <GoogleMap defaultZoom={11} defaultCenter={center}>
        <Marker position={center} />
      </GoogleMap>
    )));
  
    return (
      <>
        <h1>React Google Maps</h1>
        <ul>
          <li>Should comment out script in client/public/index.html which declares Google Maps loader for other maps</li>
          <li>Displaying a single marker for Boston</li>
          <li>May not recommend compared to other implementations, not as elegant</li>
        </ul>
        <form onSubmit={handleAddressSearch}>
          <input
            type="text"
            placeholder="Enter your zip code"
            value={address}
            onChange={handleAddressChange}
          />
          <button type="submit">Zoom In</button>
        </form>
        <MapWithAMarker
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=places`}
          loadingElement={<div style={{ height: "90%" }} />}
          containerElement={<div style={{ height: "300px" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </>
    );
  };
  

export default GoogleMaps