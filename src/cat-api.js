import axios from "axios";

const apiKey = "live_aOIYhgyqCw9ZFXBbhPIXGxyWuikffXYH7HXlX7deKSKNH9tpn2JJ0aYEdQi8K65r"; // Înlocuiește "cheia ta" cu cheia ta API

axios.defaults.headers.common["x-api-key"] = apiKey;

const CatApi = {
    url: "https://api.thecatapi.com/v1",

    fetchBreeds: async function () {
        try {
            const response = await axios.get(`${this.url}/breeds`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    fetchCatByBreed: async function (breedId) {
        try {
            const response = await axios.get(`${this.url}/images/search?breed_ids=${breedId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export { CatApi };