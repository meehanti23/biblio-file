import express from 'express';
import { getGoogleMapsAPIKey, geocodeAddress, searchPlacesTS } from './routerFunctions/index.js';

const googleMapsRouter = new express.Router();

googleMapsRouter.get('/', async (req, res) => {
    const { address } = req.query;
    try {
      const { lat, lng, location } = await geocodeAddress(address);
      const [libraryList, bookStoreList] = await Promise.all([
        searchPlacesTS(lat, lng, 'library'),
        searchPlacesTS(lat, lng, 'book store')
      ]);
      
      res.status(200).json({ lat, lng, location, libraryList, bookStoreList });
    } catch (error) {
      console.error('Error in search:', error);
      res.status(500).json({ error: 'An error occurred while searching for books.' });
    }
});

googleMapsRouter.get('/apiKey', async (req, res) => {
    try {
        const apiKey = getGoogleMapsAPIKey();
        return res.status(200).json({ apiKey });
    }
    catch (error) {
        console.error('Error in search:', error);
        return res.status(500).json({ error: 'An error occurred while searching for books.' });
    }
});

export default googleMapsRouter;