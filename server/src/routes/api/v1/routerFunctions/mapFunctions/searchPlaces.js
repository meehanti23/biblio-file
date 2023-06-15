import getGoogleMapsAPIKey from "./getGoogleMapsAPIKey.cjs";
import axios from "axios";

async function searchPlaces(lat, lng, keyword) {
    const apiKey = getGoogleMapsAPIKey();
    const requestUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${encodeURIComponent(keyword)}&location=${lat},${lng}&radius=2000&key=${apiKey}`;
    const response = await axios.get(requestUrl);
    const placeList = response.data.results.map((place) => ({
      name: place.name,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng
    }));
  
    return placeList;
}

export default searchPlaces;