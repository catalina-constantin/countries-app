export function createSearchHistory({input, resultsContainer, renderCountryList}) {
    const historyDropdown = document.createElement('div');
    historyDropdown.className = 'search-history-dropdown';
    historyDropdown.style.display = 'none';
    historyDropdown.style.position = 'absolute';
    historyDropdown.style.zIndex = '1000';

    function getLocalStorageItem(item){
        try {
            const storedItem = localStorage.getItem(item);
            return storedItem ? JSON.parse(storedItem) : {};
        } catch {
            return {};
        }
    }

    function setLocalStorageItem(item, value){
        try {
            localStorage.setItem(item, JSON.stringify(value));
        } catch (error) {
            console.error('[ERROR] LocalStorage set error:', error);
        }
    }

    function getSearchHistoryItems(){
        return Object.keys(getLocalStorageItem('searchHistory') || {});
    }

    function addSearchHistoryItem(searchTerm, results){
        const history = getLocalStorageItem('searchHistory');
        if (searchTerm in history) delete history[searchTerm];
        const keys = Object.keys(history);
        if (keys.length >= 10) {
            delete history[keys[0]];
        }
        const newHistory = { [searchTerm]: results};
        for (const key of keys) {
            newHistory[key] = history[key];
        }
        setLocalStorageItem('searchHistory', newHistory);
    }

    function showHistoryDropdown(){
        const historyItems = getSearchHistoryItems();
        if (!historyItems.length) {
            historyDropdown.style.display = 'none';
            return;
        }
        historyDropdown.innerHTML = '';
        historyItems.forEach(item => {
            const historyEntry = document.createElement('div');
            historyEntry.className = 'search-history-item';
            historyEntry.textContent = item;
            historyEntry.onclick = () => {
                input.value = item;
                historyDropdown.style.display = 'none';
                const searchHistory = getLocalStorageItem('searchHistory');
                if (searchHistory[item]) {
                    addSearchHistoryItem(item, searchHistory[item]);
                    renderCountryList(resultsContainer, searchHistory[item]);
                }
                input.focus();
            };
            historyDropdown.appendChild(historyEntry);
        });
        historyDropdown.style.left = input.offsetLeft + 'px';
        historyDropdown.style.top = (input.offsetTop + input.offsetHeight + 4) + 'px';
        historyDropdown.style.width = input.offsetWidth + 'px';
        historyDropdown.style.display = 'block';   
    }
    input.addEventListener('focus', showHistoryDropdown);
    input.addEventListener('input', showHistoryDropdown);
    input.addEventListener('blur', () => 
        setTimeout(() => {
            historyDropdown.style.display = 'none';
        }, 150));
    
    return {
        historyDropdown,
        getSearchHistoryItems,
        addSearchHistoryItem,
        showHistoryDropdown
    }
}