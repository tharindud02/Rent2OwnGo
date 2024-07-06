export const getLocationData = async () => {
  try {
    const response = await fetch('/api/getLocation');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch location data:', error);
    return null;
  }
}