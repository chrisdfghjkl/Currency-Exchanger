import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GetConversion from './converter'

function clearFields() {
  $(".showConversion").text("");
  $('.showErrors').text("");
}

function getElements(response) {
  if (response.result === "success") {
    $(".showConversion").text(`the converted amount is ${response.conversion_result}`);
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}


async function makeApiCall(amount, target) {
  const response = await GetConversion.getConversion(amount, target);
  getElements(response);
}

$(document).ready(function() {
  $('#convertSubmit').click(function() {
    event.preventDefault();
    let amount = $('#usd').val();
    let target = $("select#intlCurrency").val(); 
    clearFields();
    makeApiCall(amount, target);
  });
});