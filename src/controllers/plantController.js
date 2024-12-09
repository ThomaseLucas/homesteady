const axios = require('axios');

// Fetch plants based on hardiness zone
const fetchPlantsByZone = async (req, res) => {
    const { zone } = req.query;  // Get hardiness zone from query parameters

    if (!zone) {
        return res.status(400).json({ message: 'Zone is required' });
    }

    const apiKey = process.env.PERENUAL_API_KEY;
    console.log(process.env.PERENUAL_API_KEY);
    const url = `https://perenual.com/api/species-list?key=sk-fIe567514af95d3d37893&hardiness=${zone}&edible=True`;  // URL with filter for edibility and hardiness zone

    try {
        const response = await axios.get(url);
        console.log('Response:', response.data);
        const plants = response.data.data;
        console.log('Plants fetched:', plants);

        if (plants && plants.length > 0) {
            return res.json(plants);  // Return plants as JSON
        } else {
            return res.status(404).json({ message: 'No plants found for this zone' });
        }
    } catch (error) {
        console.log('Plants not fetched');
        console.error(error);
        return res.status(500).json({ message: 'Error fetching plants' });
    }
};

module.exports = { fetchPlantsByZone };
