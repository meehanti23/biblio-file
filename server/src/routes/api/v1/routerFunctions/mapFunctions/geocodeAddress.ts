const getGoogleMapsAPIKey = require("./getGoogleMapsAPIKey.cjs");
import axios from "axios";

interface GeoCodeResponse {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    formatted_address: string;
  }[];
}

interface GeocodeResult {
  lat: number;
  lng: number;
  location: string;
}

async function geocodeAddress(address: string): Promise<GeocodeResult> {
  const apiKey = getGoogleMapsAPIKey();
  const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  const geoCodeResponse = await axios.get<GeoCodeResponse>(requestUrl);
  const { lat, lng } = geoCodeResponse.data.results[0].geometry.location;
  const location = geoCodeResponse.data.results[0].formatted_address;

  return { lat, lng, location };
}

export default geocodeAddress;
