import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps";
import axios from "axios";

const GoogleMaps = (props) => {
  const [address, setAddress] = useState('');
  const [latAndLong, setLatAndLong] = useState({ lat: 42.361, lng: -71.057 });
  const [location, setLocation] = useState({});
  const [apiKey, setApiKey] = useState('');
  const [libraryList, setLibraryList] = useState([]);
  const [bookStoreList, setBookStoreList] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  const fetchApiKey = async () => {
    try {
      const response = await axios.get('/api/v1/googleMaps/apiKey');
      if (response.status === 200) {
        setApiKey(response.data.apiKey);
      } else {
        throw new Error('An error occurred while fetching API key.');
      }
    } catch (error) {
      console.error('Error in search:', error);
    }
  };

  useEffect(() => {
    fetchApiKey();
  }, []);

  const handleAddressSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`/api/v1/googleMaps?address=${encodeURIComponent(address)}`);
      if (response.status === 200) {
        const { lat, lng, location, libraryList, bookStoreList } = response.data;
        setLibraryList(libraryList);
        setBookStoreList(bookStoreList);
        setLatAndLong({ lat, lng });
        setLocation(location);
        setMapLoaded(true);
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

  const center = latAndLong;

  const MapWithAMarker = withScriptjs(withGoogleMap(props => (
    <GoogleMap defaultZoom={13} className="map-element" defaultCenter={center}>
      <Marker position={center} />
      {bookStoreList.map(bookStore => (
        <Marker key={bookStore.name + bookStore.lat} icon={{
          url: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
          scaledSize: new window.google.maps.Size(32, 32)
        }} position={{ lat: bookStore.lat, lng: bookStore.lng }} />
      ))}
      {libraryList.map(library => (
        <Marker key={library.name + library.lat} icon={{
          url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
          scaledSize: new window.google.maps.Size(32, 32)
        }} position={{ lat: library.lat, lng: library.lng }} />
      ))}
    </GoogleMap>
  )));

  return (
    <div className="primary show-box">
      <h1 className="map-title">Find a Book Store or Library Near You!</h1>
        <h2 className="map-description">Search for a zip code, city name or address to see nearby libraries and bookstores!</h2>
        <h3 className="map-description">Your search results will appear below the map.</h3>
        <h3 className="map-description">Book Stores - Orange ******* Libraries - Green</h3>
      <form onSubmit={handleAddressSearch}>
        <input
          type="text"
          placeholder="Enter your zip code"
          value={address}
          onChange={handleAddressChange}
        />
        <button type="submit">Zoom In</button>
      </form>
      {mapLoaded && (
        <MapWithAMarker
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=places`}
          loadingElement={<div style={{ height: "90%" }} />}
          containerElement={<div className="map-container" style={{ height: "30em", width: "60%" }} />}
          mapElement={<div className="map-element" style={{ height: "100%" }} />}
        />
      )}
    </div>
  );
};

export default GoogleMaps;
