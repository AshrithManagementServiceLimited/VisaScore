// Array wich contains all the country and somes additionals informations with this structure : 
// Name_country English_OK (1/0) Degree_English (1/0)
var dataCountryFile = [["Barbados",1,1,],
["Canada",1,0,],
["Antigua and Barbuda",1,1,],
["Australia",1,1,],
["The Bahamas",1,1,],
["Belize",1,1,],
["The British Overseas Territories",1,1,],
["Dominica",1,1,],
["Grenada",1,1,],
["Guyana",1,1,],
["Jamaica",1,1,],
["Malta",1,1,],
["New Zealand",1,1,],
["St Kitts and Nevis",1,1,],
["St Lucia",1,1,],
["St Vincent and the Grenadines",1,1,],
["Trinidad and Tobago",1,1,],
["United States of America",1,1,],
["Akrotiri and Dhekelia",1,1,],
["British Indian Ocean Territory",1,1,],
["Turks and Caicos Islands",1,1,],
["Bermuda",1,1,],
["South Georgia and the South Sandwich Islands",1,1,],
["Anguilla",1,1,],
["Falkland Islands",1,1,],
["Pitcairn Islands",1,1,],
["Cayman Islands",1,1,],
["British Virgin Islands",1,1,],
["Gibraltar",1,1,],
["Afghanistan",0,0,],
["Albania",0,0,],
["Algeria",0,0,],
["Andorra",0,0,],
["Angola",0,0,],
["Argentina",0,0,],
["Armenia",0,0,],
["Austria",0,0,],
["Azerbaijan",0,0,],
["Bahrain",0,0,],
["Bangladesh",0,0,],
["Belarus",0,0,],
["Belgium",0,0,],
["Benin",0,0,],
["Bhutan",0,0,],
["Bolivia",0,0,],
["Bosnia and Herzegovina",0,0,],
["Botswana",0,0,],
["Brazil",0,0,],
["Brunei",0,0,],
["Bulgaria",0,0,],
["Burkina Faso",0,0,],
["Burundi",0,0,],
["Cabo Verde",0,0,],
["Cambodia",0,0,],
["Cameroon",0,0,],
["Central African Republic",0,0,],
["Chad",0,0,],
["Channel Islands",0,0,],
["Chile",0,0,],
["China",0,0,],
["Colombia",0,0,],
["Comoros",0,0,],
["Congo",0,0,],
["Costa Rica",0,0,],
["Côte d'Ivoire",0,0,],
["Croatia",0,0,],
["Cuba",0,0,],
["Cyprus",0,0,],
["Czech Republic",0,0,],
["Denmark",0,0,],
["Djibouti",0,0,],
["Dominican Republic",0,0,],
["DR Congo",0,0,],
["Ecuador",0,0,],
["Egypt",0,0,],
["El Salvador",0,0,],
["Equatorial Guinea",0,0,],
["Eritrea",0,0,],
["Estonia",0,0,],
["Eswatini",0,0,],
["Ethiopia",0,0,],
["Faeroe Islands",0,0,],
["Finland",0,0,],
["France",0,0,],
["French Guiana",0,0,],
["Gabon",0,0,],
["Gambia",0,0,],
["Georgia",0,0,],
["Germany",0,0,],
["Ghana",0,0,],
["Greece",0,0,],
["Guatemala",0,0,],
["Guinea",0,0,],
["Guinea-Bissau",0,0,],
["Haiti",0,0,],
["Holy See",0,0,],
["Honduras",0,0,],
["Hong Kong",0,0,],
["Hungary",0,0,],
["Iceland",0,0,],
["India",0,0,],
["Indonesia",0,0,],
["Iran",0,0,],
["Iraq",0,0,],
["Ireland",0,0,],
["Isle of Man",0,0,],
["Israel",0,0,],
["Italy",0,0,],
["Japan",0,0,],
["Jordan",0,0,],
["Kazakhstan",0,0,],
["Kenya",0,0,],
["Kuwait",0,0,],
["Kyrgyzstan",0,0,],
["Laos",0,0,],
["Latvia",0,0,],
["Lebanon",0,0,],
["Lesotho",0,0,],
["Liberia",0,0,],
["Libya",0,0,],
["Liechtenstein",0,0,],
["Lithuania",0,0,],
["Luxembourg",0,0,],
["Macao",0,0,],
["Madagascar",0,0,],
["Malawi",0,0,],
["Malaysia",0,0,],
["Maldives",0,0,],
["Mali",0,0,],
["Mauritania",0,0,],
["Mauritius",0,0,],
["Mayotte",0,0,],
["Mexico",0,0,],
["Moldova",0,0,],
["Monaco",0,0,],
["Mongolia",0,0,],
["Montenegro",0,0,],
["Morocco",0,0,],
["Mozambique",0,0,],
["Myanmar",0,0,],
["Namibia",0,0,],
["Nepal",0,0,],
["Netherlands",0,0,],
["Nicaragua",0,0,],
["Niger",0,0,],
["Nigeria",0,0,],
["North Korea",0,0,],
["North Macedonia",0,0,],
["Norway",0,0,],
["Oman",0,0,],
["Pakistan",0,0,],
["Panama",0,0,],
["Paraguay",0,0,],
["Peru",0,0,],
["Philippines",0,0,],
["Poland",0,0,],
["Portugal",0,0,],
["Qatar",0,0,],
["Réunion",0,0,],
["Romania",0,0,],
["Russia",0,0,],
["Rwanda",0,0,],
["Saint Helena",0,0,],
["Saint Kitts and Nevis",0,0,],
["Saint Lucia",0,0,],
["Saint Vincent and the Grenadines",0,0,],
["San Marino",0,0,],
["Sao Tome & Principe",0,0,],
["Saudi Arabia",0,0,],
["Senegal",0,0,],
["Serbia",0,0,],
["Seychelles",0,0,],
["Sierra Leone",0,0,],
["Singapore",0,0,],
["Slovakia",0,0,],
["Slovenia",0,0,],
["Somalia",0,0,],
["South Africa",0,0,],
["South Korea",0,0,],
["South Sudan",0,0,],
["Spain",0,0,],
["Sri Lanka",0,0,],
["State of Palestine",0,0,],
["Sudan",0,0,],
["Suriname",0,0,],
["Sweden",0,0,],
["Switzerland",0,0,],
["Syria",0,0,],
["Taiwan",0,0,],
["Tajikistan",0,0,],
["Tanzania",0,0,],
["Thailand",0,0,],
["Timor-Leste",0,0,],
["Togo",0,0,],
["Tunisia",0,0,],
["Turkey",0,0,],
["Turkmenistan",0,0,],
["Uganda",0,0,],
["Ukraine",0,0,],
["United Arab Emirates",0,0,],
["United Kingdom",0,0,],
["United States",0,0,],
["Uruguay",0,0,],
["Uzbekistan",0,0,],
["Venezuela",0,0,],
["Vietnam",0,0,],
["Western Sahara",0,0,],
["Yemen",0,0,],
["Zambia",0,0,],
["Zimbabwe",0,0,]]

function toggleAccordion(...sectionIds) {
    sectionIds.forEach(sectionId => {
        var collapse = document.getElementById(sectionId);
        var bsCollapse = new bootstrap.Collapse(collapse);
        bsCollapse.toggle();
    });
}

document.addEventListener("DOMContentLoaded", function() {

    //Select all div that we want
    var countrySelect = document.getElementById("selectElement");
    var englishLevelSelect = document.getElementById("country");
    var yesCountryRadio = document.getElementById("yesCountry");
    var noDegreeRadioButton = document.getElementById("noCountry");
    var yesDegreeRadio = document.getElementById("yesDegree");
    var noDegreeRadioButtonTest = document.getElementById("noDegree");
    yesCountryRadio.addEventListener("change", handleCountryRadio);
    yesDegreeRadio.addEventListener("change", handleDegreeRadio);

    // Add change event listener to the "noCountry" radio button
    noDegreeRadioButton.addEventListener("change", function() {
        if (noDegreeRadioButton.checked) {
            document.getElementById("collapseExampleSecond").classList.add("show");
            scoresGlobal.pointsEnglishLevel = 0
            interMediate = false;
            calculationFunction();
        } else {
            document.getElementById("collapseExampleSecond").classList.remove("show");
        }
    });
     // Add change event listener to the "noDegree" radio button
     noDegreeRadioButtonTest.addEventListener("change", function() {
        if (noDegreeRadioButtonTest.checked) {
            document.getElementById("englishLevel").classList.remove("show");
            var divElement = document.getElementById("englishLevel");
            divElement.style.display = "block";
            scoresGlobal.pointsEnglishLevel = 0
            interMediate = false;
            calculationFunction();
        } else {
            document.getElementById("englishLevel").classList.remove("show");
        }
    });

    countrySelect.addEventListener("change", function() {
        var selectedIndex = dataCountryFile.findIndex(function(element) {
            return element[0] === countrySelect.value;
        });
        if (dataCountryFile[selectedIndex][1] == 1) {
            toggleAccordion("collapseOne", "collapseTwo");
            var bootIcon = document.getElementById("boot-icon-first");
            bootIcon.style.display = "inline"           
            isCountryEnglishSpeaker = true;
            calculationFunction();
        }
        else{
            isCountryEnglishSpeaker = false;
            calculationFunction();      
        }
    });

    // Add event listener 
    englishLevelSelect.addEventListener("change", function() {
        toggleAccordion("collapseOne", "collapseTwo");
        //interMediate = true;
        calculationFunction();
        var bootIcon = document.getElementById("boot-icon-first");
        bootIcon.style.display = "inline"
    });

    //document.querySelectorAll("input").forEach((elem) => elem.addEventListener("change", function() { window.alert("yo what up"); }));

    function handleCountryRadio() {
        toggleAccordion("collapseOne", "collapseTwo");
        interMediate = true;
        calculationFunction();
        var bootIcon = document.getElementById("boot-icon-first");
        bootIcon.style.display = "inline"
    }

    function handleDegreeRadio() {
        toggleAccordion("collapseOne", "collapseTwo");
        interMediate = true;
        calculationFunction();
        var bootIcon = document.getElementById("boot-icon-first");
        bootIcon.style.display = "inline"
    }
});