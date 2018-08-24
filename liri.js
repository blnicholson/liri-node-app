require("dotenv").config();
var fs = require("fs");
var request=require("request");
var moment = require("moment");
var keys=require("./keys.js");
var bandsintown = require("bandsintown")("codingbootcamp");
var Spotify=require("node-spotify-api");
var spotify = new Spotify(keys.spotify)
var userCommand=process.argv[2];
var userInput=process.argv;
var input="";
//For Loop
 for(var i=3; i<userInput.length; i++){
     if (i > 3 && i < userInput.length){
       input=input+"+"+userInput[i];
    }
     else{
         input+= userInput[i];
     }
 }
 //Switch/Case
 switch (userCommand){
    case "concert-this":
       bandSearch();
       break;

    case "spotify-this-song":
        if(input){
          musicSearch(input);
        }
        else {
          musicSearch("Bring me to Life");
        }
        break;
    
    case "movie-this":
    if(input){
      movieSearch(input);
    }
    else {
      movieSearch("The Burbs");
      console.log("If you haven't watched 'The Burbs', then you should: https://www.imdb.com/title/tt0096734/");
      console.log("You can find it on Amazon!");
    }
        break;  
    
    case "do-what-it-says":
    doAThing();
    break;
 }
function doAThing(){
  fs.readFile("random.txt","utf8", function(error, data){
    if(error){
      return console.log(error)
    }
    var readTxt = data.split(",");
    musicSearch(readTxt[1]);
    
    
  })
}

//=========Bands in Town======//
function bandSearch(){
  bandsintown
  .getArtistEventList(input)
  .then(function(events, err){
      if(err){
          console.log("Error Occurred " + err)
          return;
      }
    console.log("-----Concert Search Information-----")
    console.log("Venue: " + JSON.stringify(events[0].venue.place))
    console.log("Location: " + JSON.stringify(events[0].formatted_location,null,2))
     var date = moment(events[0].datetime).format("MM-DD-YYYY");
    console.log("Date: " + date);
    fs.appendFileSync("log.txt","----------Concert Information----------")
    fs.appendFileSync("log.txt","\nArtist Name: " + input);
    fs.appendFileSync("log.txt","\nVenue: " + JSON.stringify(events[0].venue.place))
    fs.appendFileSync("log.txt","\nLocation: " + JSON.stringify(events[0].formatted_location))
    fs.appendFileSync("log.txt","\nDate: " + date);
    fs.appendFileSync("log.txt"," \n ");
    fs.appendFileSync("log.txt"," \n ");
  });
  }
//=========Spotify========//
 function musicSearch(input){
spotify.search({ type: 'track', query: input }, function(err,data) {
   if (err){
     console.log("Error occurred: " + err);
    return;
   }
   console.log("-----Spotify Search Information-----")
      // Artist
    console.log("Artist Name: " + JSON.stringify(data.tracks.items[0].artists[0].name));
    //Song Name
    console.log("Song Name: " + JSON.stringify(data.tracks.items[0].name));
    //Preview Link
    console.log("Preview URL: " + JSON.stringify(data.tracks.items[0].preview_url));
    //Album
    console.log("Album Name: " + JSON.stringify(data.tracks.items[0].album.name))

    fs.appendFileSync("log.txt","----------Spotify Search Results----------")
    fs.appendFileSync("log.txt","\nArtist Name: " + JSON.stringify(data.tracks.items[0].artists[0].name));
    fs.appendFileSync("log.txt","\nSong Name: " + JSON.stringify(data.tracks.items[0].name));
    fs.appendFileSync("log.txt","\nPreview URL: " + JSON.stringify(data.tracks.items[0].preview_url));
    fs.appendFileSync("log.txt","\nAlbum Name: " + JSON.stringify(data.tracks.items[0].album.name))
    fs.appendFileSync("log.txt"," \n ");
    fs.appendFileSync("log.txt"," \n ");
  });
}
//==========OMDB========//
function movieSearch(input){
  var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function(error, response,body){
    if(!error && response.statusCode === 200) {
      console.log("-----Movie Search Information-----")
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year: "+ JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);

      fs.appendFileSync("log.txt","----------Movie Search Information----------")
      fs.appendFileSync("log.txt","\nTitle: " + JSON.parse(body).Title);
      fs.appendFileSync("log.txt","\nYear: "+ JSON.parse(body).Year);
      fs.appendFileSync("log.txt","\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value);
      fs.appendFileSync("log.txt","\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      fs.appendFileSync("log.txt","\nCountry: " + JSON.parse(body).Country);
      fs.appendFileSync("log.txt","\nLanguage: " + JSON.parse(body).Language);
      fs.appendFileSync("log.txt","\nPlot: " + JSON.parse(body).Plot);
      fs.appendFileSync("log.txt","\nActors: " + JSON.parse(body).Actors);
      fs.appendFileSync("log.txt"," \n ");
      fs.appendFileSync("log.txt"," \n ");
    }
  })
  }

