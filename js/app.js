(() => {
    const body = document.querySelector('body');
    body.innerHTML = '';

    const heading = document.createElement('h1');
    heading.id = 'title';
    heading.textContent = 'Country Search';
    body.appendChild(heading);

    const container = document.createElement('div');
    container.className = 'search-container';

    const input = document.createElement('input');
    input.className = 'search-input';
    input.type = 'text';
    input.placeholder = 'Enter country name';

    const button = document.createElement('button');
    button.className = 'search-button';
    button.textContent = 'Search';
    
    container.appendChild(input);
    container.appendChild(button);
    body.appendChild(container);

    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'country-results';
    body.appendChild(resultsDiv);   

    let allCountries = [];

    fetch('https://restcountries.com/v3.1/independent')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response error');
            }
            return response.json();
        })
        .then(data => {
            allCountries = data;
            displayCountries(allCountries);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });

    button.addEventListener('click', () => {
        const searchValue = input.value.trim().toLowerCase();
        const filtered = allCountries.filter(country =>
            country.name.common.toLowerCase().includes(searchValue)
        );
        displayCountries(filtered);
    });

    function displayCountries(countries) {
        resultsDiv.innerHTML = '';
        countries.forEach(country => {
            const countryDiv = document.createElement('div');
            countryDiv.className = 'country-card';

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
            countryDiv.appendChild(rowContainer);
            resultsDiv.appendChild(countryDiv);
        });
    }
}) ();
