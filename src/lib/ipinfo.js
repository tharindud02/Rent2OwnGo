export const getLocationData = async () => {
  const ipInforToke = process.env.IPINFOTOKEN;
  try {
    // // Check if the app is running on localhost
    // if (window.location.hostname === 'localhost') {
    //   console.log('Running on localhost, skipping location API call.');
    //   // Return a default location or handle it as needed
    //   return { region: 'Western Province' };
    // }

    const response = await fetch(`https://ipinfo.io?token=fc02cb6b5c8c26`);
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
