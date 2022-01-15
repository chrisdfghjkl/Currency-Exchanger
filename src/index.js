import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GetConversion from './converter';

function clearFields() {
  $(".showConversion").text("");
  $('.showErrors').text("");
}

function getElements(response) {
  if (response.result === "success") {
    $(".showConversion").html("<p>The converted amount is <span id='resultNum'>$" + `${response.conversion_result.toFixed(2)}` + "</span></p>");
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}


async function makeApiCall(amount, base, target) {
  const response = await GetConversion.getConversion(amount, base, target);
  getElements(response);
}

$(document).ready(function() {
  $('#convertSubmit').click(function() {
    event.preventDefault();
    let amount = $('#money').val();
    let base = $("select#inputCurrency").val();
    let target = $("select#outputCurrency").val(); 
    clearFields();
    makeApiCall(amount, base, target);
    $(".output").show();
  });
});