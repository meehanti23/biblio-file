import express from 'express';
import { getGoogleMapsAPIKey, geocodeAddress, searchPlaces } from './routerFunctions/index.js';

const googleMapsRouter = new express.Router();

googleMapsRouter.get('/', async (req, res) => {
    try {
      const { address } = req.query;
      const { lat, lng, location } = await geocodeAddress(address);
      const libraryList = await searchPlaces(lat, lng, 'library');
      const bookStoreList = await searchPlaces(lat, lng, 'book store');
      return res.status(200).json({ lat, lng, location, libraryList, bookStoreList });
    } catch (error) {
      console.error('Error in search:', error);
      return res.status(500).json({ error: 'An error occurred while searching for books.' });
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