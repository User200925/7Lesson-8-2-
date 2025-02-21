const containerCards = document.getElementById('container-cards');
const dayNightButton = document.getElementById('daynight');

async function fetchAPI() {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        console.log(data);
        generator(data);
    } catch (error) {
        console.log(error);
    }
}

fetchAPI();

function generator(products) {
    containerCards.innerHTML = '';
    products.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${element.flags.svg}" alt="">
            <h3>${element.name.common}</h3>
        `;
        containerCards.appendChild(card);
    });
}

const search = document.getElementById('search');
search.addEventListener('input', async () => {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    const searchValue = search.value.toLowerCase().trim();
    const filteredCountries = data.filter(country =>
        country.name.common.toLowerCase().includes(searchValue)
    );
    generator(filteredCountries);
});

const filter = document.getElementById('filter');
filter.addEventListener('change', async () => {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    const regionValue = filter.value.toLowerCase().trim();
    const filteredCountries = data.filter(country =>
        country.region.toLowerCase().includes(regionValue)
    );
    generator(filteredCountries);
});

// Toggle dark mode
dayNightButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
