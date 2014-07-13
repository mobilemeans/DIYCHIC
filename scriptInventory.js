//
// PLACE YOUR NEW CODE HERE:

// Make sure that an initial array of resolutions
// exists within localStorage
if (localStorage.getItem("Projects") === null) {
  var initResolutions = [
   // { name: "Hammer", value:"1"  },
   // { name: "Nails", value:"500"  },
    { name: "Change Me", value:"000"  }
  ];
  localStorage.setItem("Projects", JSON.stringify(initResolutions));
  
}

// Retrieve the current set of resolutions
var resolutions = JSON.parse(localStorage.getItem("Projects"));

function addAllResItems(resolutions) {
  $.each(resolutions, function(index, resItem) {
    renderResItem(resItem);
	
  });
}

function renderResItem(resItem) {
  var resItemHTML = '<li><div>' + resItem["name"] + " " + resItem["value"] +'</div><input type="text" style="width: 100%; padding: 2px; border: 1px solid black"/></li>';
  $("#resolution_list").append(resItemHTML);
}

function updateResolutions() {
  // Loop through the resolution items,
  // adding each to a new array
  var resolutionsUpdated = [];
  $("#resolution_list li").each(function() {
    var resName = $(this).find("div").text();
    var resItem = { "name": resName};
	resolutionsUpdated.push(resItem);
	
  });

  // Update the resolutions in localStorage
  // using the new array of updated items
  localStorage.setItem("Projects", JSON.stringify(resolutionsUpdated));
}

$(document).ready(function() {

  addAllResItems(resolutions);

});

//
// Previous code (from Lesson 2):

$('#add_resolution').click(function() {
  // Add the new resolution HTML element
  var resolutionName = $("#resolution_name").val();
  var resolutionValue = $("#resolution_value").val(); 
  var resolutionNote =  $("#resolution_note").val();
  var allValue = resolutionValue + "  NOTE:  " + resolutionNote;
 
  var resItem = { "name": "ITEM:  " +resolutionName, "value": "#:  " + allValue};
  renderResItem(resItem);
  
  // Update localStorage to include the new resolution item
  resolutions.push(resItem);
  localStorage.setItem("Projects", JSON.stringify(resolutions));
});

$(document).on('click', '#resolution_list div', function() {
  var listItem = $(this).parent();
  var itemInput = listItem.find('input');
  itemInput.val($(this).text()).show();
  $(this).hide();
});

$(document).on('blur', '#resolution_list input', function() {
  var listItem = $(this).parent();
  var nameDiv = listItem.find("div");
  nameDiv.text($(this).val()).show();
  $(this).hide();

  updateResolutions();
});