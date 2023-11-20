import axios from "axios";
import SlimSelect from 'slim-select'
import { CatApi } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.getElementById('loader');
const errorParagraph = document.querySelector('.error');
const catInfoContainer = document.querySelector('.cat-info');

// let storedBreeds = [];

function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}

function showError() {
    errorParagraph.style.display = 'Oops! Something went wrong! Try reloading the page!';
}

function hideError() {
    errorParagraph.style.display = 'Oops! Something went wrong! Try reloading the page!';
}

function displayBreedsInSelector() {
    breedSelect.innerHTML = '<option value="">Abyssinian</option>';
    storedBreeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.innerHTML = breed.name;
        breedSelect.appendChild(option);
    });
}

function renderCatInfo(catInfo) {
    catInfoContainer.innerHTML = `
    <div><img src="${catInfo.url}" alt="${catInfo.breeds[0].name}"></div>
    <div><p>Name: ${catInfo.breeds[0].name}</p>
    <p>Description: ${catInfo.breeds[0].description}</p>
    <p>Temperament: ${catInfo.breeds[0].temperament}</p></div>
    `;
}

function fetchBreeds() {
    showLoader();
    hideError();

    CatApi.fetchBreeds()
        .then(breeds => {
            storedBreeds = breeds;
            displayBreedsInSelector();
        })
        .catch(error => {
            console.error(error);
            showError(console.error('Oops! Something went wrong! Try reloading the page!'));
        })
        .finally(() => hideLoader());
}

function fetchCatInfo(breedId) {
    setTimeout(() => {
        showLoader();
        hideError();

    CatApi.fetchCatByBreed(breedId)
        .then(catInfo => {
            renderCatInfo(catInfo[0]);
        })
        .catch(error => {
            console.error(error);
            showError(console.error('Oops! Something went wrong! Try reloading the page!'));
        })
        .finally(() => hideLoader());
        
    }, 1000)
}

// Event listener pentru schimbarea selecției în breedSelect
breedSelect.addEventListener('change', function () {
    const selectedBreedId = breedSelect.value;
    fetchCatInfo(selectedBreedId);
});

// Cerere inițială pentru a obține lista de rase de pisici
fetchBreeds();
