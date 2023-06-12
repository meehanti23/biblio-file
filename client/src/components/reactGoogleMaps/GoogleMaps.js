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

    const listedLibraries = libraryList.map((library) => {
        return (
            <li key={library.name + library.lat} className="map-list-item">{library.name}</li>
        )
    });
  
    const listedBookStores = bookStoreList.map((bookStore) => {
        return (
            <li key={bookStore.name + bookStore.lat} className="map-list-item">{bookStore.name}</li>
        )
    });

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
        <div className="primary show-box grid-x">
        <h1 className="map-title cell">Find a Book Store or Library Near You!</h1>
            <h2 className="map-description cell">Search for a zip code, city name or address to see nearby libraries and bookstores!</h2>
            <h3 className="map-description cell">Your search results will appear below the map.</h3>
            <h3 className="map-description libraries small-3">Libraries</h3>
            <h3 className="map-description bookstores small-3">Book Stores</h3>
            <div className="cell">
                <form onSubmit={handleAddressSearch}>
                    <input
                    type="text"
                    className="map-input"
                    placeholder="Enter your zip code"
                    value={address}
                    onChange={handleAddressChange}
                    />
                    <button type="submit" className="map-submit">Search Google Maps</button>
                </form>
            </div>
            {mapLoaded && (
            <>
                <div className="cell">
                    <MapWithAMarker
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=places`}
                    loadingElement={<div style={{ height: "90%" }} />}
                    containerElement={<div className="map-container" style={{ height: "30em", width: "60%" }} />}
                    mapElement={<div className="map-element" style={{ height: "100%" }} />}
                    />
                </div>
                    <ul className="map-list library-list small-5">
                        <h3 className="map-list-title">Libraries</h3>
                        {listedLibraries}
                    </ul>
                    <ul className="map-list bookstore-list small-5">
                        <h3 className="map-list-title">Book Stores</h3>
                        {listedBookStores}
                    </ul>
            </>
        )}
        </div>
    );
};

export default GoogleMaps;
