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
