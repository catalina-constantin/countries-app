
export function createCountryCard(country) {
  const card = document.createElement('div');
  card.className = 'country-card';

  const rowContainer = document.createElement('div');
  rowContainer.className = 'country-row';

  const flagCol = document.createElement('div');
  flagCol.className = 'flag-col';
  const flagImg = document.createElement('img');
  flagImg.className = 'country-flag';
  flagImg.src = country?.flags?.svg || country?.flags?.png || '';
  flagImg.alt = country?.flags?.alt || `${country?.name?.common ?? 'Country'} flag`;
  flagCol.appendChild(flagImg);

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

  let expanded = false;

  function getFavourites(){
    try {
      const favs = localStorage.getItem('favouriteCountries');
      return favs ? JSON.parse(favs) : [];
    } catch {
      return [];
    }
  }
  function setFavourites(favs){
    try { localStorage.setItem('favouriteCountries', JSON.stringify(favs)); } catch {}
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

    if (!isFavourite(cca3)) {
        expanded = false;
        updateExtraVisibility();
    }
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

  function getCca3ToNameMap() {
    try {
      const raw = localStorage.getItem('countriesData'); 
      if (!raw) return new Map();
      const arr = JSON.parse(raw);
      const map = new Map();
      if (Array.isArray(arr)) {
        arr.forEach(c => {
          if (c?.cca3 && c?.name?.common) {
            map.set(c.cca3, c.name.common);
          }
        });
      }
      return map;
    } catch {
      return new Map();
    }
  }

  function bordersToNames(borderCodes){
    if (!Array.isArray(borderCodes) || borderCodes.length === 0) return '-';
    const nameMap = getCca3ToNameMap();
    return borderCodes.map(code => nameMap.get(code) || code).join(', ');
  }

  star.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavourite(country.cca3);
  });
  updateStar();

  nameHeading.appendChild(star);
  nameHeading.appendChild(document.createTextNode(country.name.common));
  textCol.appendChild(nameHeading);

  const infoColumns = document.createElement('div');
  infoColumns.className = 'country-info-columns';

  const firstCol = document.createElement('div');
  firstCol.className = 'info-col';
  const capitalText = Array.isArray(country.capital) ? country.capital.join(', ') : (country.capital ?? '-');
  const languagesText = Object.values(country.languages || {}).join(', ') || '-';
  const mapsLink = country?.maps?.googleMaps || '#';

  firstCol.innerHTML = `
    <p><span class="label">Capital:</span> ${capitalText}</p>
    <p><span class="label">Language:</span> ${languagesText}</p>
    <p><span class="label">Map:</span> <a href="${mapsLink}" target="_blank" rel="noopener noreferrer">Google Maps</a></p>
  `;

  const lastCol = document.createElement('div');
  lastCol.className = 'info-col';
  const populationText = (typeof country.population === 'number') ? country.population.toLocaleString() : (country.population ?? '-');
  const currencyText = Object.values(country.currencies || {}).map(c => c?.name).filter(Boolean).join(', ') || '-';

  lastCol.innerHTML = `
    <p><span class="label">Population:</span> ${populationText}</p>
    <p><span class="label">Currency:</span> ${currencyText}</p>
  `;

  const extraInfo = document.createElement('div');
  extraInfo.className = 'country-extra-info';

  const timezonesText = Array.isArray(country.timezones) ? country.timezones.join(', ') : '-';
  const regionText = [country.region, country.subregion].filter(Boolean).join(' (') + (country.subregion ? ')' : '');
  const bordersText = bordersToNames(country.borders);

  extraInfo.innerHTML = `
    <p><span class="label">Region:</span> ${regionText || '-'}</p>
    <p><span class="label">Timezones:</span> ${timezonesText}</p>
    <p><span class="label">Borders:</span> ${bordersText}</p>
  `;

  function updateExtraVisibility(){
    const show = isFavourite(country.cca3) && expanded;
    extraInfo.style.display = show ? '' : 'none';
    card.classList.toggle('is-expanded', show);
  }
  updateExtraVisibility();

  card.addEventListener('click', () => {
    if (!isFavourite(country.cca3)) return;
    expanded = !expanded;
    updateExtraVisibility();
  });

  infoColumns.appendChild(firstCol);
  infoColumns.appendChild(lastCol);
  textCol.appendChild(infoColumns);
  textCol.appendChild(extraInfo);

  rowContainer.appendChild(flagCol);
  rowContainer.appendChild(textCol);
  card.appendChild(rowContainer);

  return card;
}
``
