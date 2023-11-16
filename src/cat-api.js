import axios from "axios";

const ENDPOINT = 'https://api.thecatapi.com/v1/breeds';
const API_KEY = "live_aOIYhgyqCw9ZFXBbhPIXGxyWuikffXYH7HXlX7deKSKNH9tpn2JJ0aYEdQi8K65r";

// Funcția pentru a face solicitarea cu Axios și cheia API în antete
async function fetchBreeds(value) {
    try {
        const response = await axios.get(`${ENDPOINT}?breed_ids=${value}`, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        console.dir(response);
        return response.data;
    } catch (error) {
        console.error('Eroare de rețea:', error.message);
        throw error; // Aruncă eroarea pentru a putea fi gestionată în apelul funcției
    }
};

const ENDPOINT_SEARCH = 'https://api.thecatapi.com/v1/images/search';

 async function fetchCatByBreed(breedId) {
    try {
        const response = await get(`${ENDPOINT_SEARCH}?breed_ids=${breedId}`, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        console.dir(response);
        return response.data;
    } catch (error) {
        console.error('Eroare de rețea:', error.message);
        throw error; // Aruncă eroarea pentru a putea fi gestionată în apelul funcției
    }
};

export default {
    fetchBreeds,
    fetchCatByBreed };