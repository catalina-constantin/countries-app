export function createFab({ onClick } = {}) {
    const fab = document.createElement('button');
    fab.className = 'fab';
    fab.innerHTML = `
        <svg class="star-svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
            <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
        </svg>
    `;
    if( typeof onClick === 'function' ) {
        fab.addEventListener('click', onClick);
    }
    return fab;
}