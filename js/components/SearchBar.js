export function createSearchBar() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search countries...';
    input.className = 'search-input';
    
    const button = document.createElement('button');
    button.textContent = 'Search';
    button.className = 'search-button';
    
    searchContainer.appendChild(input);
    searchContainer.appendChild(button);
    
    return { searchContainer, input, button };
}