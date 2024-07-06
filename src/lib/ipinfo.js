export const getLocationData = async () => {
  try {
    // Check if the app is running on localhost
    if (window.location.hostname === 'localhost') {
      console.log('Running on localhost, skipping location API call.');
      // Return a default location or handle it as needed
      return { region: 'Western Province' };
    }

    const response = await fetch(`https://ipinfo.io?token=${process.env.IPINFOTOKEN}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch location data:', error);
    return null;
  }
};
