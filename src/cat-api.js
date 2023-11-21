// cat-api.js

const CatApi = {
    url: "https://api.thecatapi.com/v1",
    apiKey: "live_aOIYhgyqCw9ZFXBbhPIXGxyWuikffXYH7HXlX7deKSKNH9tpn2JJ0aYEdQi8K65r",

    fetchBreeds: function () {
        return fetch(`${this.url}/breeds`, { headers: { 'X-Api-Key': this.apiKey } })
            .then(response => response.json());
    },

    fetchCatByBreed: function (breedId) {
        return fetch(`${this.url}/images/search?breed_ids=${breedId}`, { headers: { 'X-Api-Key': this.apiKey } })
            .then(response => response.json());
    }
};

export { CatApi };
