export async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/independent');    
    if (!response.ok) {
        throw new Error('[ERROR] Network response error');
    }
    return response.json();
}