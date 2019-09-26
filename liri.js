require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

var spotify = new Spotify(keys.spotify);

var selectAction = process.argv[2];

var userSearch = process.argv.slice(3).join(" ");

if (selectAction === "concert-this") {
Search.concertThis(userSearch);
}
else if (selectAction === "spotify-this-song") {

}
else if (selectAction === "movie-this") {

}
else if (selectAction === "do-what-it-says") {

}


var Search = function() {
    // divider will be used as a spacer between the tv data we print in log.txt
    var divider = "\n------------------------------------------------------------\n\n";
  
    // findShow takes in the name of a tv show and searches the tvmaze API
    this.concertThis = function(artist) {
      var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  
      axios.get(URL).then(function(response) {
        // Place the response.data into a variable, jsonData.
        var jsonData = response.data;
  
        // showData ends up being the string containing the show data we will print to the console
        var showData = [
          "Venue: " + jsonData.venue.name,
          "Location: " + jsonData.venue.city,
          "Date: " + moment(jsonData.datetime, "MM/DD/YYY")
        ].join("\n\n");
  
        // Append showData and the divider to log.txt, print showData to the console
        fs.appendFile("log.txt", showData + divider, function(err) {
          if (err) throw err;
          console.log(showData);
        });

        console.log(showData);
      });
    };
  
    this.spotifySong = function(song) {
      //var URL = "http://api.tvmaze.com/search/people?q=" + song;
  
      // Add code to search the TVMaze API for the given actor
      // The API will return an array containing multiple actors, just grab the first result
      // Append the actor's name, birthday, gender, country, and URL to the `log.txt` file
      // Print this information to the console
      spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);

    var jsonData = response.data;
  
        // showData ends up being the string containing the show data we will print to the console
        var songData = [
          "Artist: " + jsonData.person.name,
          "Song Name: " + jsonData.person.birthday,
          "Song URL: " + jsonData.person.gender,
          "Album: " + jsonData.person.country.name
        ].join("\n\n");
  
        // Append showData and the divider to log.txt, print showData to the console
        fs.appendFile("log.txt", songData + divider, function(err) {
          if (err) throw err;
          console.log(songData);
        });
  })
  .catch(function(err) {
    console.log(err);
  });

    };
  };

