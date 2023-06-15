function getGoogleMapsAPIKey(): string | undefined {
    return process.env.GOOGLE_MAPS_API_KEY;
  }

  export default getGoogleMapsAPIKey;