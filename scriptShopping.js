//
// PLACE YOUR NEW CODE HERE:

// Make sure that an initial array of resolutions exists within localStorage
if (localStorage.getItem("A4CShopping") === null) {
  var initShopping = [
   // { name: "Hammer", value:"1"  },
   // { name: "Nails", value:"500"  },
    { name: "Change Me", value:"000"  }
  ];
  localStorage.setItem("A4CShopping", JSON.stringify(initShopping));
  
}

// Retrieve the current set of shopping
var shopping = JSON.parse(localStorage.getItem("A4CShopping"));

function addAllShopItems(shopping) {
  $.each(shopping, function(index, shopItem) {
    renderShopItem(shopItem);
	
  });
}

function renderShopItem(shopItem) {
  var shopItemHTML = '<li><div>' + shopItem["name"] + " " + shopItem["value"] +'</div><input type="text" style="width: 100%; padding: 2px; border: 1px solid black"/></li>';
  $("#shopping_list").append(shopItemHTML);
}
function deleteShopItem(){
	var shopItemHTML = '';
  	$("#shopping_list").append(shopItemHTML);
	
}

function updateShopping() {
  // Loop through the resolution items,
  // adding each to a new array
  var shoppingUpdated = [];
  $("#shopping_list li").each(function() {
    var shopName = $(this).find("div").text();
    var shopItem = { "name": shopName};
	shoppingUpdated.push(shopItem);
	
  });

  // Update the resolutions in localStorage
  // using the new array of updated items
  localStorage.setItem("A4CShopping", JSON.stringify(shoppingUpdated));
}

$(document).ready(function() {

  addAllShopItems(shopping);

});

//
// Previous code (from Lesson 2):

$('#add_shopping').click(function() {
  // Add the new resolution HTML element
  var shoppingName = $("#shopping_name").val();
  var shoppingValue = $("#shopping_value").val(); 
  var shoppingNote =  $("#shopping_note").val();
  var allValue = shoppingValue + "  NOTE:  " + shoppingNote;
 
  var shopItem = { "name": "ITEM:  " +shoppingName, "value": "#:  " + allValue};
  renderShopItem(shopItem);
  
  // Update localStorage to include the new resolution item
  shopping.push(shopItem);
  localStorage.setItem("A4CShopping", JSON.stringify(shopping));
});

$('#remove_shopping').click(function() {
  // delete HTML element  
  deleteShopItem();
  
  // Update localStorage to include the new resolution item
  //shopping.push(shopItem);
 // localStorage.setItem("shopping", JSON.stringify(shopping));
  
  var json = JSON.parse(localStorage["A4CShopping"]);
	for (i=0;i<json.length;i++){
            json.splice(i,1);			
	}
	localStorage["A4CShopping"] = JSON.stringify(json);
	
  
});

$(document).on('click', '#shopping_list div', function() {
  var listItem = $(this).parent();
  var itemInput = listItem.find('input');
  itemInput.val($(this).text()).show();
  $(this).hide();
});

$(document).on('blur', '#shopping_list input', function() {
  var listItem = $(this).parent();
  var nameDiv = listItem.find("div");
  nameDiv.text($(this).val()).show();
  $(this).hide();

  updateShopping();
});