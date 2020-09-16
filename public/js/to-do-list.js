var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://quotes15.p.rapidapi.com/quotes/random/?language_code=en",
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "quotes15.p.rapidapi.com",
    "x-rapidapi-key": "262c7ebcffmsh8849fcbb203742bp1dcdddjsn28a1c31e979a"
  }
}

$(document).ready(function() {
  $("#flip").click(function() {
    if($("#panel").css("display") === 'block'){
      $.ajax(settings).done(function(response) {
        $("#quotes").text(response.content);
        $("#author").text("- " + response.originator.name);
      });
    }
  });
});

$(document).ready(function() {
  $("#flip").click(function() {
    $("#panel").slideToggle("slow");
  });
});


$(document).ready(function() {
  var access_key = 'eb287c9a351aa80dd5b81e4fa9a45f6b';

  // get the API result via jQuery.ajax
  $.ajax({
    url: 'https://api.ipstack.com/check?access_key=' + access_key,
    dataType: 'jsonp',
    success: function(json) {
      $("span").html("<span name=ipcity value=" + json.city + "," + json.region_name + ">" + json.city + ", " + json.region_name + "</span>");
    }
  });
});
