function save_options() {
  var input = document.getElementById("url");
  var url = input.value;
  localStorage["url"] = url;

  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

function restore_options() {
  var url = localStorage["url"] || "http://www.commafeed.com";
  var input = document.getElementById("url");
  input.value=url;
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);