import API from './cat-api.js';
import axios from "axios";

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('click', fetchBreeds(API)); // Schimba 'click' cu 'change'

async function fetchBreeds(value) {
    const selectedBreed = document.querySelector('.breed-select');
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Abyssinian';
    breedSelect.appendChild(defaultOption);

    // Afișează loader în timp ce se încarcă datele
    // breedSelect.display = 'none'
    // loader.style.display = 'block';
    // errorMessage.style.display = 'none';
    // catInfo.innerHTML = ''; // Golește conținutul anterior

    try {
        const data = await API.fetchBreeds(value);
        
        // Ascunde loader după ce datele sunt încărcate cu succes
        loader.style.display = 'none';

        // Afiseaza informatiile despre pisica
       
    } catch (error) {
        // Afișează un mesaj de eroare în caz de eșec
        loader.style.display = 'none';
        errorMessage.style.display = 'block';
        console.error('Oops! Something went wrong! Try reloading the page!', error.message);
    }
}

// function renderCatInfo(data) {
//     // Implementează logica pentru afișarea datelor în elementul catInfo
//     // (de exemplu, poți construi un markup HTML din datele primite și să-l adaugi în catInfo.innerHTML)
//     const { name, description, temperament, urlToImage } = e;
//     catInfo.innerHTML = `
//     <div class="cat-info">
//             <img src='${urlToImage}' class="cat-image">
//             <h2 class="cat-name">${name}</h2>
//             <p class="cat-description">${description}</p>
//             <p class="cat-temperament">${temperament}</p>
//         </div>
//     `;
// }

// function updateBreedInfo(markup) {
//     document.querySelector('cat-info').innerHTML = markup;
// }
 
