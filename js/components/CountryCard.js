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

    const star = document.createElement('span');
    star.className = 'favourite-star';

    star.innerHTML = `
        <svg viewBox="0 0 24 24" width="28" height="28" class="star-svg" aria-hidden="true" focusable="false">
            <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
        </svg>
    `;

    function getFavourites(){
        try {
            const favs = localStorage.getItem('favouriteCountries');
            return favs ? JSON.parse(favs) : [];
        } catch {
            return [];
        }
    }

    function setFavourites(favs){
        try {
            localStorage.setItem('favouriteCountries', JSON.stringify(favs));
        } catch {}
    }

    function isFavourite(cca3){
        const favs = getFavourites();
        return favs.includes(cca3);
    }

    function toggleFavourite(cca3){
        let favs = getFavourites();
        if (favs.includes(cca3)) {
            favs = favs.filter(code => code !== cca3);
        } else {
            favs = [cca3, ...favs];
        }
        setFavourites(favs);
        updateStar();
    }

    function updateStar(){
        if (isFavourite(country.cca3)) {
            star.classList.add('is-favourite');
            star.title = 'Remove from favourites';
        } else {
            star.classList.remove('is-favourite');
            star.title = 'Add to favourites';
        }
    }

    star.onclick = () => toggleFavourite(country.cca3);
    updateStar();

    nameHeading.appendChild(star);
    nameHeading.appendChild(document.createTextNode(country.name.common));
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