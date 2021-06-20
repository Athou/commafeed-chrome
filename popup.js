var options = [ {id:"url", default:"https://www.commafeed.com"},
                {id:"headline_nr", default:10},
                {id:"headline_category", default:"all"} ];

function populate_popup() {
  for (key in options) {
    console.log(options[key]["id"]);
    if (options[key]["id"] == "headline_category") {
      document.getElementById("headline_category").innerHTML = '<a href="' + localStorage["url"] || search("url", options)["default"]
                                                               + '/#/feeds/view/category/' + localStorage["headline_category"]
                                                               || options["headline_category"]["default"] + '">' + localStorage["headline_category"]
                                                               || options["headline_category"]["default"] + '</a>';
    } else {
      var content = localStorage[options[key]["id"]] || options[key]["default"];
      var div = document.getElementById(options[key]["id"]);
      div.innerHTML = content;
    }
  }
  fetch_headlines().catch(function(err) {
        document.getElementById("headlines").innerHTML = '<p>Error fetching headlines: ' + err.message + '</p><br />';
  });
}

async function fetch_headlines() {
  var fetch_url = (localStorage["url"] || search("url", options)["default"])
                  + '/rest/category/entries?id=' + (localStorage["headline_category"]
                  || search("headline_category", options)["default"]) + '&readType=unread&offset=0&limit='
                  + (localStorage["headline_nr"] || search("headline_nr", options)["default"])
                  + '&order=desc&onlyIds=false';
  console.log(fetch_url);
  var api_response = await fetch(fetch_url, {credentials: "include", mode:'no-cors'})
                           .then(function(response) {
                           if (!response.ok) {
			     console.log(response);
                             throw Error(response.statusText);
                           }});
  var headlines = await api_response.json();
  var output = "";
  for (id in headlines) {
    output.concat('<p><img src="' + headlines.entries[id]["iconUrl"] + '" /> <a href="' + headlines.entries[id]["url"] +
                      '" target="_blank">' + headlines.entries[id]["title"] + '</a></p>');
  }
  console.log(output);
  document.getElementById("headlines").innerHTML = output;
}

document.addEventListener('DOMContentLoaded', populate_popup);
