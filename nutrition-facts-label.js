$(document).ready(function(){
  $('#nutrition-label').nutritionLabel({"itemName": ""});
  $('#gfb-nutrition-label-button').on('click', function(){
    gfbnutritionlabel.submitForm();
  });
  $('#gfb-nutrition-label-download').on('click', function(){
    gfbnutritionlabel.generateImage();
  });
});
