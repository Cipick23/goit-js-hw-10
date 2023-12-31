import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';


document.addEventListener('DOMContentLoaded', () => {
    let breedSelect = document.querySelector('#breed-select');
    const loader = document.querySelector('.loader');
    const spinner = document.querySelector('.load-spinner');
    const error = document.querySelector('.error');
    const catInfo = document.querySelector('.cat-info');

  loader.style.display = 'none';
  spinner.style.display = 'none';
  error.style.display = 'none';

  fetchBreeds()
    .then(breeds => {
        loader.style.display = 'none';
        spinner.style.display = 'none';
        new SlimSelect({
          breedSelect: '#breed-select',
          settings: {
            alwaysOpen: false,
            placeholderText: 'Select Breed',
            openPosition: 'down'
          }
        });  
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(error => {
        loader.style.display = 'none';
        spinner.style.display = 'none';
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        console.error('Error fetching breeds:', error);
    });

    breedSelect.addEventListener('change', event => {
    const selectedBreedId = event.target.value;

    if (selectedBreedId) {
        loader.style.display = 'block';
        spinner.style.display = 'block';
        error.style.display = 'none';
        catInfo.style.display = 'none';

      fetchCatByBreed(selectedBreedId)
        .then(catData => {
          const catImage = document.createElement('img');
          catImage.src = catData.url;
          catImage.style.width = '50%';
          catImage.style.height = 'auto';
          catImage.style.marginRight = '20px';
          catInfo.innerHTML = '';
          catInfo.appendChild(catImage);
          const catName = document.createElement('p');
          catName.textContent = catData.breeds[0].name;
          catInfo.appendChild(catName);
          const catDescription = document.createElement('p');
          catDescription.textContent = catData.breeds[0].description;
          catInfo.appendChild(catDescription);
          const catTemperament = document.createElement('p');
          catTemperament.textContent = catData.breeds[0].temperament;
          catInfo.appendChild(catTemperament);
          catName.style.fontSize = '16px';
          catName.style.fontStyle = 'bold';
          catName.style.fontWeight = '700';
        })
        .catch(error => {
            loader.style.display = 'none';
            spinner.style.display = 'none';
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
          console.error('Error fetching cat information:', error);
        })
        .finally(() => {
            loader.style.display = 'none';
            spinner.style.display = 'none';
            catInfo.style.display = 'block';
        });
    }
  });
});