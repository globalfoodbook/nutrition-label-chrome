var GFBNutritionLabel = function(){};

GFBNutritionLabel.prototype.generateImage = function(){
  var node = [document.getElementById('nutrition-label')];
  html2canvas(node, {
    // logging: true,
    useCORS: true,
    background :'#FFFFFF',
    allowTaint: true,
    letterRendering: true,
    onrendered: function(canvas) {
      var context = canvas.getContext('2d');
      // context.webkitImageSmoothingEnabled = false;
      context.mozImageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;
      context.oImageSmoothingEnabled = false;
			var image = canvas.toDataURL("image/jpeg");
			// console.log("Image: ", image);
			// window.location.href=image;
			var anchor = document.createElement('a');
	    anchor.setAttribute('download', 'nutrition-label.jpg');
	    anchor.setAttribute('href', image);
	    anchor.click();
    }
  });
}

GFBNutritionLabel.prototype.get = function(ingredients){
  var url = "http://nuts.globalfoodbook.net/"
  path = url+"?ingredients="+ingredients,
  loader = document.getElementById("gfb-nutrition-label-loader"),
  errorMsg = "An error has occured. Please verify that you ingredient(s) are correctly entered line by line.",
  xmlhttp,
  response

  loader.style.display = "inline";

  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
   xmlhttp=new XMLHttpRequest();
  } else {// code for IE6, IE5
   xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4){
      if(xmlhttp.status == 200) {
        try {
          var settings = {
              "showServingUnitQuantity":true,
              "showPolyFat":true,
              "showMonoFat":true,
              // "showDisclaimer" : true,
              "itemName": "",
              "ingredientList": ingredients
            };
          response = JSON.parse(xmlhttp.responseText);
          $('#nutrition-label').nutritionLabel($.extend(settings, response));
        } catch(error) {
          alert(errorMsg + "\n" + error);
        }
      } else {
        alert(errorMsg);
      }
      loader.style.display = "none";
    }
   }
  //  console.log("url: ", path);
  xmlhttp.open("GET",path,true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send();
}

GFBNutritionLabel.prototype.submitForm = function() {
  var contentOfTextArea = document.getElementById("gfb-nutrition-label-textarea").value,
  ingredients

  if (contentOfTextArea.length <= 1) {
    alert("Please add your ingredients before submitting this form.")
    return false;
  } else if (contentOfTextArea.indexOf('!') > -1) {
    alert("Please remove exclammation mark (!) from your ingredients listing.")
    return false;
  } else {
    ingredients = contentOfTextArea.split("\n").join(",").trim();
    this.get(ingredients);
    // document.forms['gfb-nutrition-label-form'].submit();
  }
}
gfbnutritionlabel = new GFBNutritionLabel();
