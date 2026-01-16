export function createFab({ allCountries = [], renderCountryList } = {}) {
    const fab = document.createElement('button');
    fab.className = 'fab';
    fab.innerHTML = `
        <svg class="star-svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
            <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
        </svg>
    `;

    function getFavourites() {
        try {
            const favs = localStorage.getItem('favouriteCountries');
            return favs ? JSON.parse(favs) : [];
        } catch {
            return [];
        }
    }

    function showFavouritesModal() {
        const existing = document.getElementById('favourites-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'favourites-modal';
        modal.className = 'favourites-modal';

        const header = document.createElement('div');
        header.className = 'favourites-modal-header';

        const title = document.createElement('h2');
        title.textContent = 'Favourite Countries';
        title.className = 'favourites-modal-title';

        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.className = 'favourites-modal-close';
        closeBtn.onclick = () => modal.remove();

        header.appendChild(title);
        header.appendChild(closeBtn);
        modal.appendChild(header);

        const favCodes = getFavourites();
        const favCountries = allCountries.filter(c => favCodes.includes(c.cca3));

        if (favCountries.length === 0) {
            const emptyMsg = document.createElement('p');
            emptyMsg.textContent = 'No favourite countries yet.';
            emptyMsg.className = 'favourites-modal-empty';
            modal.appendChild(emptyMsg);
        } else {
            const list = document.createElement('div');
            list.className = 'favourites-modal-list';
            favCountries.forEach(c => {
                const row = document.createElement('div');
                row.className = 'favourites-modal-row';

                const flag = document.createElement('img');
                flag.src = c.flags && c.flags.svg ? c.flags.svg : '';
                flag.alt = c.flags && c.flags.alt ? c.flags.alt : c.name.common + ' flag';
                flag.className = 'favourites-modal-flag';

                const name = document.createElement('span');
                name.textContent = c.name.common;
                name.className = 'favourites-modal-country-name';

                row.appendChild(flag);
                row.appendChild(name);
                list.appendChild(row);
            });
            modal.appendChild(list);
        }

        document.body.appendChild(modal);

        function handleClickOutside(e) {
            if (!modal.contains(e.target) && e.target !== fab) {
                modal.remove();
                document.removeEventListener('mousedown', handleClickOutside);
            }
        }
        setTimeout(() => {
            document.addEventListener('mousedown', handleClickOutside);
        }, 0);
    }

    fab.addEventListener('click', showFavouritesModal);

    return fab;
}