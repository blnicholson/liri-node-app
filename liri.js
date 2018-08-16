require("dotenv").config();
//Requiring keys.js
var keys=require("./keys.js");

//Requiring npms
var Spotify=require("node-spotify-api");

//User Inputs
 var input=process.argv;
 var userSearch=input[2];
 var userSearch2=process.argv[3];

 switch (userSearch){
     case "spotify-this-song":
        spotifyLog(userSearch2);
        break;
 }

 //Spotify Function
 function spotifyLog(userSearch2){

    //using keys.js to read secret info
  var spotify = new Spotify(keys.spotify)
//  var songTitle="";
//  for(var i=2; i<userSearch2.length; i++){
//      if (i > 2 && i < userSearch2.length){
//        songTitle=songTitle+"+"+userSearch2[i];
//     }
//      else{
//          songTitle+= userSearch2[i];
//      }
//  }
 //using keys.js to read secret info
 var spotify = new Spotify(keys.spotify)
   

spotify.search({ type: 'track', query: userSearch2 }, function(err,data) {
 
      // Artist
    console.log(JSON.stringify(data.tracks.items[0].artists[0].name));
    //Song Name
    console.log(JSON.stringify(data.tracks.items[0].name));
    //Preview Link
    console.log(JSON.stringify(data.tracks.items[0].preview_url));
    //Album
    console.log(JSON.stringify(data.tracks.items[0].album.name))
  })
}
