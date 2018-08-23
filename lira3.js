var request = require("request");
var userCommand = process.argv[2];
var userInput = process.argv;
var movieName="";

for (var i = 3; i < userInput.length; i++){
  if (i > 3 && i < userInput.length){
    movieName =movieName + "+" + userInput[i];
  }
  else{
    movieName += userInput[i];
  }
}
switch(userCommand){
  case "movie-this":
      movieSearch();
      break;
}
function movieSearch(){
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
request(queryUrl, function(error, response,body){
  if(!error && response.statusCode === 200) {
    console.log(queryUrl);
    console.log("Title: " + JSON.parse(body).Title)
    console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value)
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value)
    console.log("Country: " + JSON.parse(body).Country)
    console.log("Language: " + JSON.parse(body).Language)
    console.log("Plot: " + JSON.parse(body).Plot)
    console.log("Actors: " + JSON.parse(body).Actors)
  }
})
}
