// get fields from index.html
const countryField = document.querySelector('#countryDropdown');
const stateField = document.querySelector('#stateDropdown');
const countryStateCode = document.querySelector('#country-state-code');

//store country data here
class Country {
    constructor(name, code){
        this.name = name;
        this.code = code;
    }
}
let countryData = [];
let statesData = [];

// information to reach API
const countriesURL = 'https://xc-ajax-demo.herokuapp.com/api/countries/';


// countries first!

const getCountries = async () => {
    try{
        const response = await fetch (countriesURL);
            if(response.ok){
                let jsonresponse = await response.json();
                let countryList = [];
                for(let i = 0; i < jsonresponse.length; i++){
                   countryData.push(jsonresponse[i]);
                    countryList.push(`<option value="${jsonresponse[i].name}" id="${jsonresponse[i].code}">${jsonresponse[i].name}</option>`);
                }
                countryList.join("");
                countryField.innerHTML = countryList;
            }

    }catch(error){
        console.log(error);
    }
}

// retrieve states!
const getStates = async () => {
    statesData = [];
    try{
        const countryCode = countryData[countryField.selectedIndex].code;
        const response = await fetch (`${countriesURL}${countryCode}/states/`);
                if(response.ok){
                    let jsonresponse = await response.json();
                    let statesList = [];
                    for(let i = 0; i < jsonresponse.length; i++){
                       statesData.push(jsonresponse[i]);
                       statesList.push(`<option value="${jsonresponse[i].name}">${jsonresponse[i].name}</option>`);
                    }
                    statesList.join("");
                    stateField.innerHTML = statesList;
                }
                updateCountryStateCode();

    }catch(error){
        console.log(error);
    }
}

const updateCountryStateCode = () => {
    //countryStateCode.classList.remove('animated', 'bounce');
    let countryCode = countryData[countryField.selectedIndex].code;
    let stateCode = statesData[stateField.selectedIndex].code;
    countryStateCode.innerHTML = `${stateCode}, ${countryCode}`;
   
    countryStateCode.classList.add('animated', 'bounce');
   // countryStateCode.classList.add('animation-iteration-count', '3');
   //countryStateCode.animateCss('bounce');
    countryStateCode.addEventListener('animationend', () => {
        countryStateCode.classList.remove('animated', 'bounce');  
    });
  // let twinCode = countryStateCode.cloneNode(true);
  // countryStateCode.parentElement.replaceChild(twinCode, countryStateCode);
   //.replaceChild(twinCode, countryStateCode);
}
  
getCountries().then(getStates);