import { convertDate } from './utils';
import forecast from './api/forecast';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const zipCode = urlParams.get('zip_code');
const singleDate = urlParams.get('date');
const multiDate = urlParams.get('start_date');

forecast(zipCode);
