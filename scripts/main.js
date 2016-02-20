'use strict';

var user = 'user=cnadolny';
var key = 'api_key=64259f917a0f87fa7699076e168c98d9';
var url = 'http://ws.audioscrobbler.com/2.0/';
var currPlaying;
var methods = [
      'album',
      'artist',
      ''
    ];
var divs = ["nowplaying", "history", "topsong"];


$( document ).ready(function() {
    $("#history").hide();
    $("#topsong").hide();
});

function showHide(d){
	var div = document.getElementById(d);
	for(var i = 0; i < divs.length; i++){
		if( div != document.getElementById(divs[i]) ){
			document.getElementById(divs[i]).style.display='none';
		} else{
			div.style.display = 'block';
		}
	}
}

$.post(url, 'method=user.getRecentTracks&'+user+'&'+key +'&format=json', function(data){

	if(data.recenttracks.track[0]["@attr"] == undefined){
		$('#isplaying').append("<h1>Last Played</h1>");
	} else{
		$('#isplaying').append("<h1>Now Playing</h1>");
	}

	var curr = data.recenttracks.track[0];

	var image = curr.image[3]["#text"];

	$('div#nowplaying div#main-song #imgs').append('<img src="' + image + '" />');

    var artist = curr.artist["#text"];

    $('div#nowplaying div#main-song #artist').append(artist);

    var song = curr.name;
    $('div#nowplaying div#main-song #song').append(song);
});

//http://ws.audioscrobbler.com/2.0/method=user.getTopTracks&user=cnadolny&api_key=64259f917a0f87fa7699076e168c98d9&format=json

$.post(url, 'method=user.getTopTracks&'+user+'&'+key +'&format=json', function(data){
	var curr = data.toptracks["track"];
	console.log(curr[0]);
	for(var i = 0; i < 10; i++){
		$('div#topsong div#main-song').append("<li>"+curr[i]["name"]+"</li>");
	}

});

$.post(url, 'method=user.getRecentTracks&'+user+'&'+key +'&format=json', function(data){
	var curr = data.recenttracks["track"];
	console.log(curr[0]);
	for(var i = 0; i < 10; i++){

		// $('div#history div#main-song').append("<img src="+curr[i]["image"][3]["#text"]+"/><br>"+"<li>"+curr[i]["name"]+"</li><br>");
		var image = curr[i]["image"][3]["#text"];
		var artist = curr[i].artist["#text"];
		var song = curr[i].name;

		$('div#history div#main-song').append("<div class='img-wrap'><img src=" + image + "/><br><span class='img-desc'><br>"+song+"<br><div style='font-weight: 400; font-size: 13px'>"+artist+"</div><br></span></div><br><br>");
	}

});

