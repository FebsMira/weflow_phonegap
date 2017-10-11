'use strict';
window.onload = function() {
	document.addEventListener("deviceready", onDeviceReady, false);
	if(!window.cordova){
		setTimeout(function(){
			onDeviceReady();
		},2000);
	}
};


function onDeviceReady(){
	console.log("Ready")
	window.App = new App();
	//window.Fisioterapeuta = new Fisioterapeuta();
}

var myApp = new Framework7({
	swipePanel: 'left',
});
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
	dynamicNavbar: true,
	swipeBackPage: false
});
