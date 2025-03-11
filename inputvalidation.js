$(document).ready(function() {
  // Initialize the DataTable with specific settings
  $(document).ready(function() {
      $('#example1').dataTable({
          "bPaginate": true,
          "bLengthChange": false,
          "bFilter": true,
          "bInfo": false,
          "pageLength": 7,
          "bAutoWidth": false,
          "dom": '<"search"l><"top"f>rt<"bottom"ip><"clear">',
          "language": {
              "searchPlaceholder": "Search a job or code ...",
              "search": ""
          }
      });
      $('.dataTables_wrapper .dataTables_paginate').addClass('text-center');
  });

  // Create a responsive table 
  $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function(event) {
      var tabID = $(event.target).attr('data-bs-target');
      if (tabID === '#profile') {
          table2.columns.adjust().responsive.recalc();
      }
  });

});

$(function() {


  // Retrieve the data for the line selected by the user in the jobs table
  $('#example1 tr').click(function() {
       
      const shortageOccupationDiv = document.getElementById("shortageOccupationGlobal");

      firstColumnContent = $(this).find('td:first').html();
      secondColumnContent = $(this).find('td:eq(1)').html();
      seventhColumnContent = $(this).find('td:eq(4)').html();
      const descriptionShortage = document.getElementById("isAShortageOccupation");

      if (parseInt(getDataFromArray(parseInt(firstColumnContent.toString()), data, 4)) == 1) {
         

          
          const idToLookup = parseInt(firstColumnContent.toString());
          
          const sixthColumnValueTTT = getDataFromArray(idToLookup, data,5) || "No description for this occupation";

          const content = `
              <p class='card-text'>Your job might be considered a &ldquo;shortage occupation&rdquo;. <strong>Please check if this description applies to you, and adjust the setting if it does not:</strong></p>
              <p class='alert alert-secondary'>${sixthColumnValueTTT}</h5>
          `;
          descriptionShortage.innerHTML = content;
          descriptionShortage.classList.remove("hidden");
          shortageOccupationDiv.classList.remove("hidden");

      } else {
          shortageOccupationDiv.classList.add("hidden");
          descriptionShortage.classList.add("hidden");
          var checkbox = document.getElementById("shortageOccupation");
          checkbox.checked = false;
          isAShortageOccupation = 0;
      }
      
      //Check if the selected job is eligible
      if (parseInt(getDataFromArray(parseInt(firstColumnContent.toString()), data, 3)) == 1){
        jobIsEligible = 1;
      }else{
        jobIsEligible = 0;
      }

      //Display of selected job
      sixColumnContent = $(this).find('td:eq(4)').html();
      $('#buttonExpand').trigger('click');
      var resultatElement = document.getElementById('resultJob');
      resultatElement.innerHTML = "You selected the job : <strong>" + secondColumnContent + "</strong><br> Average UK salary for this job : <strong>" + seventhColumnContent + "</strong>"
      resultatElement.style.display = "block";
      var divToHide = document.getElementById("askSalary");
      divToHide.removeAttribute("hidden");
      calculationFunction();
  });

});
var selectListCountry = document.getElementById("selectElement");

// Function for sorting the table alphabetically
dataCountryFile.sort(function(a, b) {
  var countryA = a[0].toUpperCase();
  var countryB = b[0].toUpperCase();
  if (countryA < countryB) {
      return -1;
  }
  if (countryA > countryB) {
      return 1;
  }
  return 0;
});

// Filling in the list of countries 
dataCountryFile.forEach(function(item) {
  var newOption = document.createElement("option");
  newOption.text = item[0];
  newOption.setAttribute("data-tokens", item[0]);
  selectListCountry.add(newOption);
});



const radioInputs = document.querySelectorAll('input[name="phDQuestion"]');

// Add event listener to each radio input
radioInputs.forEach(input => {
    input.addEventListener('change', function() {
        var bootIcon = document.getElementById("boot-icon-phd");
        bootIcon.style.display = "inline"
    });
});


const jobOfferSelect = document.getElementById("jobOffer");
// Add event listener to jobOfferSelect
jobOfferSelect.addEventListener("change", function() {
    const selectedValue = jobOfferSelect.value;
    if (selectedValue === "0" || selectedValue === "20") {

        var bootIcon = document.getElementById("boot-icon-joboffer");
        bootIcon.style.display = "inline"
    } else {
        bootIconJobOfferSelect.style.display = "none";
    }
});

// Add a listner to modify the validation or questioning icon

const form = document.getElementById("exampleInputSalary");
    form.addEventListener("change", function(event) {
        var inputSalary = document.getElementById("exampleInputSalary");
        var salaryValue = inputSalary.value;
        // var bootIcon = document.getElementById("boot-icon-pick-a-job");
        // bootIcon.style.display = "inline"
        const toggleIcon = document.getElementById('toggle-icon');
        if(salaryValue!=0){
            const svgContentOriginal = `
            <svg id="toggle-icon" xmlns="http://www.w3.org/2000/svg"  style="color: rgb(40, 167, 69);" width="28" height="28" fill="currentColor">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
          `;
            
        toggleIcon.innerHTML = svgContentOriginal;
            
        }else{
            const svgContentAlternate = `
            <svg id="toggle-icon" xmlns="http://www.w3.org/2000/svg"  style="color: rgb(250, 165, 0); width="28" height="28" fill="currentColor" >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
            </svg>
        `;
          toggleIcon.innerHTML = svgContentAlternate;
        }

    });
//Add a listner to all "input" and "select" tags to detect changes in the form
    const formElementss = document.querySelectorAll('input, select');
    formElementss.forEach(element => {
  element.addEventListener('change', () => {
        calculationFunction();
  });
});