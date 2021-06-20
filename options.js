var options = [ {id:"url", default:"https://www.commafeed.com"},
                {id:"headline_nr", default:10},
                {id:"headline_category", default:"all"} ];

function save_options() {
  options.forEach(function(item) {
    localStorage[item.id] = document.getElementById(item.id).value;
  });

  document.getElementById("status").innerHTML = "<p style=\"color: green;\">Options Saved.</p>";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

function restore_options() {
  options.forEach(function(item) {
    document.getElementById(item.id).value = localStorage[item.id] || item.default;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
