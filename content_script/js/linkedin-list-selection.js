// Loads the lists of the user in the selector
//
function appendListSelector() {
  getLeadsLists(function(json) {
    if (json != "none") {
      $(".eh_list_select_container").html('<select class="eh_list_select"></select>');

      chrome.storage.sync.get('current_leads_list_id', function(value) {
        jQuery.each(json.data.leads_lists, function(i, val) {
          if (value['current_leads_list_id'] == val.id) { selected = 'selected="selected"' }
          else { selected = '' }
          $(".eh_list_select").append("<option " + selected +" value='" + val.id + "'>" + val.name + "</option>")
        });

        $(".eh_list_select").append("<option value='new_list'>Create a new list...</option>")
      });

      updateCurrentList();
    }
  });
}

// Select the current list
//
function updateCurrentList() {
  $(".eh_list_select").on("change", function(){
    console.log($(this).val())
    if ($(this).val() == "new_list") {
      OpenInNewTab("https://emailhunter.co/leads_lists/new?utm_source=chrome_extension&utm_medium=extension&utm_campaign=extension")
    }
    else {
      chrome.storage.sync.set({'current_leads_list_id': $(this).val()}, function() {
        // Current list updated
      });
    }
  });
}
