import { fetchCountries } from "./api/countriesApi.js";
import { createSearchBar } from "./components/SearchBar.js";
import { renderCountryList } from "./components/CountryList.js";

const body = document.querySelector('body');
body.innerHTML = '';

const heading = document.createElement('h1');
heading.id = 'title';
heading.textContent = 'Country Search';
body.appendChild(heading);

const resultsContainer = document.createElement('div');
resultsContainer.className = 'country-results';
body.appendChild(resultsContainer);

let allCountries = [];

const {searchContainer, input, button} = createSearchBar();
body.insertBefore(searchContainer, resultsContainer);

fetchCountries()
    .then(data => {
        allCountries = data;
        renderCountryList(resultsContainer, allCountries);     
    })
    .catch(error => {
        console.error('[ERROR] Fetch error:', error);
    });

button.addEventListener('click', () => {
    const searchValue = input.value.trim().toLowerCase();
    const filtered = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(searchValue)
    );
    renderCountryList(resultsContainer, filtered);
});