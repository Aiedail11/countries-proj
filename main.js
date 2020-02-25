
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


//let's make a call to the database to get data for the strings
//AJAX functions!

// countries first!


const getCountries = async () => {
try{
    const response = await fetch (countriesURL);
            if(response.ok){
                let jsonresponse = await response.json();
               // console.log( jsonresponse);
                let countryList = [];
               // console.log(jsonresponse.length);
                for(let i = 0; i < jsonresponse.length; i++){
                   // console.log(jsonresponse[i].name);
                   countryData.push(jsonresponse[i]);
                    countryList.push(`<option value="${jsonresponse[i].name}" id="${jsonresponse[i].code}">${jsonresponse[i].name}</option>`);
                }
                
                countryList.join("");
                countryField.innerHTML = countryList;
                return response;
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
       // console.log(countryCode);
        const response = await fetch (`${countriesURL}${countryCode}/states/`);
                if(response.ok){
                    let jsonresponse = await response.json();
                   // console.log( jsonresponse);
                    let statesList = [];
                   // console.log(jsonresponse.length);
                  // stateField.va"${jsonresponse[0].name}</option>`);
                    for(let i = 0; i < jsonresponse.length; i++){
                       // console.log(jsonresponse[i].name);
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
        let countryCode = countryData[countryField.selectedIndex].code;
        let stateCode = statesData[stateField.selectedIndex].code;
        countryStateCode.innerHTML = `${stateCode}, ${countryCode}`;
    }
  
getCountries().then(getStates);

