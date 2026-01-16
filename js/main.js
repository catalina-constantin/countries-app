import { fetchCountries } from "./api/countriesApi.js";
import { createSearchBar } from "./components/SearchBar.js";
import { renderCountryList } from "./components/CountryList.js";
import { createSearchHistory } from "./components/SearchHistory.js";
import { createFab } from "./components/FavouriteCountryFab.js";

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

const searchHistory = createSearchHistory({
    input,
    resultsContainer,
    renderCountryList,
});
searchContainer.appendChild(searchHistory.historyDropdown);

function performSearch() {
    const searchValue = input.value.trim().toLowerCase();
    if (searchValue.length < 3) {
        resultsContainer.innerHTML = '<p class="search-message">Please enter at least 3 characters to search for a country</p>';
        return;
    }
    const filtered = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(searchValue)
    );
    renderCountryList(resultsContainer, filtered);
    if (filtered.length > 0) {
        searchHistory.addSearchHistoryItem(searchValue, filtered);
    }
}

function setLocalStorageItem(item, value){
    try {
        localStorage.setItem(item, JSON.stringify(value));
    } catch (error) {
        console.error('[ERROR] LocalStorage set error:', error);
    }
}

fetchCountries()
    .then(data => {
        allCountries = data;
        setLocalStorageItem('countriesData', allCountries);

        const fab = createFab({
            allCountries,
            renderCountryList,
        });
        body.appendChild(fab);
    })
    .catch(error => {
        console.error('[ERROR] Fetch error:', error);
    });

button.addEventListener('click', performSearch);

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        performSearch();
        if (searchHistory && searchHistory.historyDropdown) {
            searchHistory.historyDropdown.style.display = 'none';
        }
    }
});