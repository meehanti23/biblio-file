import express from 'express';
import axios from 'axios';

const googleMapsRouter = new express.Router();

googleMapsRouter.get('/', async (req, res) => {
    try {
        const { address } = req.query;
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        const geoCodeResponse = await axios.get(requestUrl);
        const { lat, lng } = geoCodeResponse.data.results[0].geometry.location;
        const location = geoCodeResponse.data.results[0].formatted_address;
        const libraryRequestUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=library&location=${lat},${lng}&radius=2000&key=${apiKey}`;
        const libraryResponse = await axios.get(libraryRequestUrl);
        const bookStoreRequestUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=book%store&location=${lat},${lng}&radius=2000&key=${apiKey}`;
        const bookStoreResponse = await axios.get(bookStoreRequestUrl);
        const libraryList = libraryResponse.data.results.map((library) => {
            return {
                name: library.name,
                lat: library.geometry.location.lat,
                lng: library.geometry.location.lng
            }
        })
        const bookStoreList = bookStoreResponse.data.results.map((bookStore) => {
            return {
                name: bookStore.name,
                lat: bookStore.geometry.location.lat,
                lng: bookStore.geometry.location.lng
            }
        })
        return res.status(200).json({ lat, lng, location: location, libraryList, bookStoreList });
    }
    catch (error) {
        console.error('Error in search:', error);
        return res.status(500).json({ error: 'An error occurred while searching for books.' });
    }
});

googleMapsRouter.get('/apiKey', async (req, res) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        return res.status(200).json({ apiKey });
    }
    catch (error) {
        console.error('Error in search:', error);
        return res.status(500).json({ error: 'An error occurred while searching for books.' });
    }
});

export default googleMapsRouter;