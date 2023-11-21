import axios from "axios";
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';import { CatApi } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.getElementById('loader');
const errorParagraph = document.querySelector('.error');
const catInfoContainer = document.querySelector('.cat-info');
let storedBreeds = [];

hideError();
hideLoader();

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

function displayBreedsInSelector(breeds) {
    breedSelect.innerHTML = '';
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.innerHTML = breed.name;
        breedSelect.appendChild(option);
    });
}

function fetchBreeds() {
    showLoader();
    hideError();

    CatApi.fetchBreeds()
        .then(breeds => {
            storedBreeds = breeds;
            displayBreedsInSelector(storedBreeds);
        })
        .catch(error => {
            showError();
        })
        .finally(() => {
            hideLoader();
        });
}


function renderCatInfo(catInfo) {
    catInfoContainer.innerHTML = `
        <div><img src="${catInfo.url}" alt="${catInfo.breeds[0].name}"></div>
        <div>
            <p>Name: ${catInfo.breeds[0].name}</p>
            <p>Description: ${catInfo.breeds[0].description}</p>
            <p>Temperament: ${catInfo.breeds[0].temperament}</p>
        </div>
    `;
}

function fetchCatInfo(breedId) {
    showLoader();

    // Ascunde breedSelect în timpul cererii pentru informații despre pisică
    breedSelect.classList.add('hidden');

    CatApi.fetchCatByBreed(breedId)
        .then(catInfo => {
            renderCatInfo(catInfo[0]);
        })
        .catch(error => {
            showError();
        })
        .finally(() => {
            hideLoader(); // Ascunde loader după finalizarea cererii
            breedSelect.classList.remove('hidden'); // Afișează breedSelect după finalizarea cererii
        });
}

// Event listener pentru schimbarea selecției în breedSelect
breedSelect.addEventListener('change', function () {
    const selectedBreedId = breedSelect.value;
    fetchCatInfo(selectedBreedId);
});

// Cerere inițială pentru a obține lista de rase de pisici
fetchBreeds();