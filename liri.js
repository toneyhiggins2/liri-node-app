require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var selectAction = process.argv[2];

var userSearch = process.argv.slice(3).join(" ");

var concert = function(artist){

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

}

var spotifyThis = function(song) {
  spotify
.search({ type: 'track', query: userSearch })
.then(function(response) {
  //console.log(response);

  var jsonData = response.tracks.items;
  console.log("Below is the jsonData");
  console.log(jsonData);

      // showData ends up being the string containing the show data we will print to the console
      var songData = [
        "Artist: " + jsonData.artists,
        "Song Name: " + jsonData.name,
        "Song URL: " + jsonData.preview_url,
        "Album: " + jsonData.album.name
      ].join("\n\n");

      // Append showData and the divider to log.txt, print showData to the console
      fs.appendFile("log.txt", songData, function(err) {
        if (err) throw err;
        console.log(songData);
      });
})
.catch(function(err) {
  console.log(err);
});
}

var movieThis = function(movie){
  var URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
  
  axios.get(URL).then(function(response) {
    // Place the response.data into a variable, jsonData.
    var jsonData = response.data;
    console.log(jsonData);

    // showData ends up being the string containing the show data we will print to the console
    var movieData = [
      "Title: " + jsonData.Title,
      "Year: " + jsonData.Year,
      "IMDB Rating: " + jsonData.Ratings[0].Value,
      "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
      "Country: " + jsonData.Country,
      "Language: " + jsonData.Language,
      "Plot: " + jsonData.Plot,
      "Actors: " + jsonData.Actors
    ].join("\n\n");

    // Append showData and the divider to log.txt, print showData to the console
    fs.appendFile("log.txt", movieData, function(err) {
      if (err) throw err;
      console.log(movieData);
    });

    //console.log(movieData);
  });
}

if (selectAction === "concert-this") {
concert(userSearch);
}
else if (selectAction === "spotify-this-song") {
spotifyThis(userSearch);
}
else if (selectAction === "movie-this") {
movieThis(userSearch);
}
else if (selectAction === "do-what-it-says") {

}


// var Search = function() {
//     // divider will be used as a spacer between the tv data we print in log.txt
//     var divider = "\n------------------------------------------------------------\n\n";
  
//     // findShow takes in the name of a tv show and searches the tvmaze API
//     this.concertThis = function(artist) {
//       var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  
//       axios.get(URL).then(function(response) {
//         // Place the response.data into a variable, jsonData.
//         var jsonData = response.data;
  
//         // showData ends up being the string containing the show data we will print to the console
//         var showData = [
//           "Venue: " + jsonData.venue.name,
//           "Location: " + jsonData.venue.city,
//           "Date: " + moment(jsonData.datetime, "MM/DD/YYY")
//         ].join("\n\n");
  
//         // Append showData and the divider to log.txt, print showData to the console
//         fs.appendFile("log.txt", showData + divider, function(err) {
//           if (err) throw err;
//           console.log(showData);
//         });

//         console.log(showData);
//       });
//     };
  
//     this.spotifySong = function(song) {
//       //var URL = "http://api.tvmaze.com/search/people?q=" + song;
  
//       // Add code to search the TVMaze API for the given actor
//       // The API will return an array containing multiple actors, just grab the first result
//       // Append the actor's name, birthday, gender, country, and URL to the `log.txt` file
//       // Print this information to the console
      
//       spotify
//   .search({ type: 'track', query: 'spotify-this-song' })
//   .then(function(response) {
//     console.log(response);

//     var jsonData = response.data;
  
//         // showData ends up being the string containing the show data we will print to the console
//         var songData = [
//           "Artist: " + jsonData.person.name,
//           "Song Name: " + jsonData.person.birthday,
//           "Song URL: " + jsonData.person.gender,
//           "Album: " + jsonData.person.country.name
//         ].join("\n\n");
  
//         // Append showData and the divider to log.txt, print showData to the console
//         fs.appendFile("log.txt", songData + divider, function(err) {
//           if (err) throw err;
//           console.log(songData);
//         });
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

//     };

//     this.movieThis = function(movie) {
//         var URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
    
//         axios.get(URL).then(function(response) {
//           // Place the response.data into a variable, jsonData.
//           var jsonData = response.data;
    
//           // showData ends up being the string containing the show data we will print to the console
//           var movieData = [
//             "Title: " + jsonData.Title,
//             "Year: " + jsonData.Year,
//             "IMDB Rating: " + jsonData.Rating[0].Source,
//             "Rotten Tomatoes Rating: " + jsonData.Rating[1].Source,
//             "Country: " + jsonData.Country,
//             "Language: " + jsonData.Language,
//             "Plot: " + jsonData.Plot,
//             "Actors: " + jsonData.Actors
//           ].join("\n\n");
    
//           // Append showData and the divider to log.txt, print showData to the console
//           fs.appendFile("log.txt", movieData + divider, function(err) {
//             if (err) throw err;
//             console.log(showData);
//           });
  
//           console.log(showData);
//         });
//       };
//   };

