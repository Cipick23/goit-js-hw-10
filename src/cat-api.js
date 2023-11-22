import axios from "axios";
import Notiflix from 'notiflix';

axios.defaults.headers.common["x-api-key"] = 
"live_aOIYhgyqCw9ZFXBbhPIXGxyWuikffXYH7HXlX7deKSKNH9tpn2JJ0aYEdQi8K65r";

export const fetchBreeds = () => {
    return axios
        .get(`https://api.thecatapi.com/v1/breeds`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
        throw error;
    });
};

export const fetchCatByBreed = breedId => {
    return axios
        .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => {
            return response.data[0];
        })
        .catch(error => {
        throw error;
    })
};