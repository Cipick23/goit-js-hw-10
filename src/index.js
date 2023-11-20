import { CatApi } from './cat-api.js';
import axios from "axios";
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';


const breedSelect = document.querySelector('.breed-select');
const loader = document.getElementById('loader');
const errorParagraph = document.querySelector('.error');
const catInfoContainer = document.querySelector('.cat-info');

let storedBreeds = [];

function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}

function showError() {
    errorParagraph.style.display = 'block';
    errorParagraph.innerHTML = 'Oops! Something went wrong! Try reloading the page!';
}

function hideError() {
    errorParagraph.style.display = 'none';
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
            showError();
        })
        .finally(() => hideLoader());
}

function fetchCatInfo(breedId) {
    showLoader();
    hideError();

    CatApi.fetchCatByBreed(breedId)
        .then(catInfo => {
            renderCatInfo(catInfo[0]);
        })
        .catch(error => {
            showError();
        })
        .finally(() => hideLoader());
}

// Event listener pentru schimbarea selecției în breedSelect
breedSelect.addEventListener('change', function () {
    const selectedBreedId = breedSelect.value;
    fetchCatInfo(selectedBreedId);
});

// Cerere inițială pentru a obține lista de rase de pisici
fetchBreeds();
