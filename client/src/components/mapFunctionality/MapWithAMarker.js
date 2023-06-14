import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from "react-google-maps";
import React from "react";

const MapWithAMarker = withScriptjs(withGoogleMap(({ bookStoreList, libraryList, handleBookStoreMarkerClick, selectedBookStoreMarker, setSelectedBookStoreMarker, handleLibraryMarkerClick, selectedLibraryMarker, setSelectedLibraryMarker, latAndLong }) => (
    <GoogleMap defaultZoom={13} className="map-element" defaultCenter={latAndLong}>
        <Marker position={latAndLong} />
        {bookStoreList.map((bookStore, index) => (
            <Marker key={bookStore.name + bookStore.lat} icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
            scaledSize: new window.google.maps.Size(32, 32)
            }} position={{ lat: bookStore.lat, lng: bookStore.lng }}
            onClick={() => handleBookStoreMarkerClick(index)}>
        {selectedBookStoreMarker === index && (
            <InfoWindow onCloseClick={() => setSelectedBookStoreMarker(null)}>
            <div>{bookStore.name}</div>
            </InfoWindow>
        )}
            </Marker>
        ))}
        {libraryList.map((library, index) => (
            <Marker key={library.name + library.lat} icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            scaledSize: new window.google.maps.Size(32, 32)
            }} position={{ lat: library.lat, lng: library.lng }}
            onClick={() => handleLibraryMarkerClick(index)}>
        {selectedLibraryMarker === index && (
            <InfoWindow onCloseClick={() => setSelectedLibraryMarker(null)}>
            <div>{library.name}</div>
            </InfoWindow>
        )}
            </Marker>
        ))}
    </GoogleMap>
)));

export default MapWithAMarker;