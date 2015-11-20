$(document).ready(function(){
  $('#gfb-nutrition-label-chrome').nutritionLabel({"itemName": ""});
  $('#gfb-nutrition-label-button').on('click', function(){
    gfbnutritionlabel.submitForm();
  });
  $('#gfb-nutrition-label-download').on('click', function(){
    gfbnutritionlabel.generateImage();
  });
});
