//
// Update the list of profiles selected in the search
//

function updateSelection() {
  var selected_profiles = new Array;

  $(".result.people").each(function(index) {
    //console.log($(this).find(".fa-check-square").length);
    if($(this).find(".fa-check-square").length) {
      profile_path = $(this).find(".title").attr("href");
      selected_profiles.push(profile_path);
    }
  });

  window.selected_profiles = selected_profiles;
}

function updateSelectionView() {
  if (window.selected_profiles.length > 0) {
    if (window.selected_profiles.length == 1) { s = ""; } else { s = "s"; }
    if ($("#eh_search_selection_popup").length > 0) {
      $("#eh_profile_selected").html('<strong>' + window.selected_profiles.length + ' profile' + s + '</strong> selected');
    }
    else {
      var logo = chrome.extension.getURL('shared/img/orange_transparent_logo.png');
      $("body").append('<div id="eh_search_selection_popup"><i class="fa fa-ellipsis-v eh_search_popup_drag"></i><div id="eh_search_popup_close">&times;</div><img src="' + logo + '" alt="Email Hunter"><div id="eh_profile_selected"><strong>' + window.selected_profiles.length + ' profile' + s + '</strong> selected</div><button class="orange-btn">Find email addresses & save leads</button></div>');

      // Launch the search
      html = "";
      $("#eh_search_selection_popup button").click(function() {
        window.profile = new Array;

        window.selected_profiles.forEach(function(profile_path, index) {
          fetchProfileFromSearch(profile_path, function(response) {
            parseLinkedinProfile(response, function(profile) {
              window.profile[index] = profile;
              console.log(window.profile[index]);
            });
          });
        });
      })

      // Drag popup
      $("#eh_search_selection_popup").draggable({ handle: ".eh_search_popup_drag" });

      // Close popup
      $("#eh_search_popup_close").click(function() {
        closeSearchPopup();
      });
      $(document).keyup(function(e) {
        if (e.keyCode == 27) {
          closeSearchPopup();
        }
      });
    }
  }
  else {
    closeSearchPopup();
  }
}

function closeSearchPopup() {
  $("#eh_search_selection_popup").remove();
}


// Finds the domain name of the last experience or returns false
//
function fetchProfileFromSearch(profile_path, callback) {
  $.ajax({
    url : profile_path,
    type : 'GET',
    success : function(response){
      return callback(response);
    },
    error : function() {
      // ERROR
    }
  });
}
