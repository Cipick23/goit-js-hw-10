import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { CatApi } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.getElementById('loader');
const errorParagraph = document.querySelector('.error');
const catInfoContainer = document.querySelector('.cat-info');


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

function onBreedSelectChange(selectedBreedId) {
    showLoader();
    hideError();

    CatApi.fetchCatByBreed(selectedBreedId)
        .then(catInfo => {
            renderCatInfo(catInfo[0]);
        })
        .catch(error => {
            showError();
        })
        .finally(() => hideLoader());
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

// Inițializare lista de rase
CatApi.fetchBreeds()
    .then(breeds => {
        displayBreedsInSelector(breeds);
    })
    .catch(error => {
        showError();
    });

function displayBreedsInSelector(breeds) {
    breedSelect.innerHTML = '';
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.innerHTML = breed.name;
        breedSelect.appendChild(option);
    });
}
