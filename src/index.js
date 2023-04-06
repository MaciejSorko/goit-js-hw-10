import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
const countryInfo = document.querySelector('.country-info');
const input = document.querySelector('#search-box');
function errorHandler(errToHandle) {
  console.log(errToHandle);
  Notiflix.Notify.warning('Ooops, there is no country with that name');
  countryInfo.innerHTML = '';
}
input.addEventListener(
  'input',
  debounce(() => {
    fetchCountries(input.value.trim())
      .then(country => renderCountry(country))
      .catch(error => errorHandler(error));
  }, DEBOUNCE_DELAY)
);

function renderCountry(country) {
  if (country.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    countryInfo.innerHTML = '';
  } else if (country.length >= 2) {
    const markup = country
      .map(info => {
        return `
      <p><img src="${info.flags.svg}"  max-width="50" height="20"> ${info.name.official}</p>
        `;
      })
      .join('');
    countryInfo.innerHTML = markup;
  } else if (country.length === 1) {
    const markup = country
      .map(info => {
        return `
      <p style="font-size: 36px"><img src="${
        info.flags.svg
      }"  width="60" height="30"><b>${info.name.official}</b></p>
          <p><b>Capital</b>: ${info.capital}</p>
          <p><b>Population</b>: ${info.population}</p>
          <p><b>Languages</b>: ${Object.values(info.languages)}</p>
        `;
      })
      .join('');
    countryInfo.innerHTML = markup;
  }
}
