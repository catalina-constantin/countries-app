export async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/independent');    
    if (!response.ok) {
        throw new Error('[ERROR] Network response error');
    }
    return response.json();
}

export async function fetchCountryByName(name) {
  const base = 'https://restcountries.com/v3.1/name/';
  const fields = [
    'name','flags','capital','languages','population','region','subregion',
    'currencies','timezones','maps','borders'
  ].join(',');

  const url = `${base}${encodeURIComponent(name)}?fullText=true&fields=${fields}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    return Array.isArray(data) && data.length ? data[0] : null;
  } catch (err) {
    console.error('[ERROR] fetchCountryByName:', err);
    return null;
  }
}