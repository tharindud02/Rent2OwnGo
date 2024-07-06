// export const getLocationData = async () => {
//     const ipInforToke = process.env.IPINFOTOKEN;
//     try {
//         // // Check if the app is running on localhost
//         // if (window.location.hostname === 'localhost') {
//         //   console.log('Running on localhost, skipping location API call.');
//         //   // Return a default location or handle it as needed
//         //   return { region: 'Western Province' };
//         // }

//         const response = await fetch(`https://ipinfo.io?token=${process.env.IPINFOTOKEN}`);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Failed to fetch location data:', error);
//         return null;
//     }
// };


// pages/api/location.js

export default async function handler(req, res) {
    // Check if the app is running on localhost
    const host = req.headers.host;
    if (host && host.startsWith('localhost')) {
        console.log('Running on localhost, skipping location API call.');
        // Return a default location if running on localhost
        res.status(200).json({ region: 'Western Province' });
        return;
    }
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    try {
        const response = await fetch(`https://ipinfo.io/${clientIp}?token=${process.env.IPINFOTOKEN}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error('Failed to fetch location data:', error);
        return res.status(500).json({ error: 'Failed to fetch location data' });
    }
}
