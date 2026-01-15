import {createCountryCard} from './CountryCard.js';

export function renderCountryList(container, countries) {
    container.innerHTML = '';
    countries.forEach(country => {
        const countryCard = createCountryCard(country);
        container.appendChild(countryCard);
    });
}