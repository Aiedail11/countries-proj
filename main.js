
// get fields from index.html
const countryField = document.querySelector('#countryDropdown');
const cityField = document.querySelector('#cityDropdown');

// strings of HTML we are going to insert
let countriesString = "";
let citiesString = "";

// information to reach API
const countriesURL = 'https://xc-ajax-demo.herokuapp.com/api/countries/';

//let's make a call to the database to get data for the strings
//AJAX functions!

// countries first!
const getCountries = async () => {


}

//translate json objects to strings using a for loop?


countryField.innerHTML = '<option value="England">England</option>';
