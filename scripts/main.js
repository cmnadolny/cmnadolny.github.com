'use strict';

var user = 'user=cnadolny';
var key = 'api_key=64259f917a0f87fa7699076e168c98d9';
var url = 'http://ws.audioscrobbler.com/2.0/';
var currPlaying;
// var methods = [
//       'album',
//       'artist',
//       ''
//     ];

var claudia = "hello";

$.post(url, 'method=user.getRecentTracks&'+user+'&'+key +'&format=json', function(data){
	console.log("wow it worked");
	console.log(data);

	if(data.recenttracks.track[0]["@attr"] == undefined){
		currPlaying = true;
	} else{
		currPlaying = false;
	}

	var curr = data.recenttracks.track[0];

	var image = curr.image[3]["#text"];

	$('#imgs').append('<img src="' + image + '" />');

    var artist = curr.artist["#text"];
    console.log(curr.artist["#text"]);

    $('#artist').append(artist);

    var bio = data.recenttracks.track;
    var song = curr.name;
    $('#song').append(song);

});




