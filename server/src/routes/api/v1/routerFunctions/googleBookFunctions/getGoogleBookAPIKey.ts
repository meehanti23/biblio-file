function getGoogleBookAPIKey(): string | undefined {
  return process.env.GOOGLE_API_KEY;
}

export default getGoogleBookAPIKey;