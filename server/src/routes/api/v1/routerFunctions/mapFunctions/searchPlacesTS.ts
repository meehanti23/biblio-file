const getGoogleMapsAPIKey = require("./getGoogleMapsAPIKey.cjs");
import axios from "axios";

interface Place {
  name: string;
  lat: number;
  lng: number;
}

async function searchPlaces(lat: number, lng: number, keyword: string): Promise<Place[]> {
  const apiKey = getGoogleMapsAPIKey();
  const requestUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${encodeURIComponent(keyword)}&location=${lat},${lng}&radius=2000&key=${apiKey}`;
  const response = await axios.get(requestUrl);
  const placeList: Place[] = response.data.results.map((place: any) => ({
    name: place.name,
    lat: place.geometry.location.lat,
    lng: place.geometry.location.lng
  }));

  return placeList;
}

export default searchPlaces;
