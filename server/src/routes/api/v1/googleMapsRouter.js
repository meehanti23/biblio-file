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
        console.log(lat, lng)
        return res.status(200).json({ lat, lng, location: location });
    }
    catch (error) {
        console.error('Error in search:', error);
        return res.status(500).json({ error: 'An error occurred while searching for books.' });
    }
});

export default googleMapsRouter;