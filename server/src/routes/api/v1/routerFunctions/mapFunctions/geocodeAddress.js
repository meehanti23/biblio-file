import getGoogleMapsAPIKey from "./getGoogleMapsAPIKey.cjs";
import axios from "axios";

async function geocodeAddress(address) {
    const apiKey = getGoogleMapsAPIKey();
    const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const geoCodeResponse = await axios.get(requestUrl);
    const { lat, lng } = geoCodeResponse.data.results[0].geometry.location;
    const location = geoCodeResponse.data.results[0].formatted_address;
    return { lat, lng, location };
}

export default geocodeAddress;