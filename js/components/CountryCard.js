export function createCountryCard(country) {
    const card = document.createElement('div');
    card.className = 'country-card';

    const rowContainer = document.createElement('div');
    rowContainer.className = 'country-row';

    const flagCol = document.createElement('div');
    flagCol.className = 'flag-col';
    flagCol.innerHTML = `<img class="country-flag" src="${country.flags.svg}" alt="${country.flags.alt}" />`;

    const textCol = document.createElement('div');
    textCol.className = 'text-col';

    const nameHeading = document.createElement('h2');
    nameHeading.textContent = country.name.common;
    textCol.appendChild(nameHeading);

    const infoColumns = document.createElement('div');
    infoColumns.className = 'country-info-columns';

    const firstCol = document.createElement('div');
    firstCol.className = 'info-col';
    firstCol.innerHTML = `
        <p><span class="label">Capital:</span> ${country.capital}</p>
        <p><span class="label">Language:</span> ${Object.values(country.languages || {}).join(', ')}</p>
        <p><span class="label">Map:</span> <a href="${country.maps.googleMaps}" target="_blank">Google Maps</a></p>
    `;

    const lastCol = document.createElement('div');
    lastCol.className = 'info-col';
    lastCol.innerHTML = `
        <p><span class="label">Population:</span> ${country.population.toLocaleString()}</p>
        <p><span class="label">Currency:</span> ${Object.values(country.currencies || {}).map(currency => currency.name).join(', ')}</p>
    `;

    infoColumns.appendChild(firstCol);
    infoColumns.appendChild(lastCol);
    textCol.appendChild(infoColumns);

    rowContainer.appendChild(flagCol);
    rowContainer.appendChild(textCol);
    card.appendChild(rowContainer);
    
    return card;
}