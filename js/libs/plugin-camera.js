//CAMERA ACTION SHEET MOBILE
function pluginCamera(){
	var deferred = $.Deferred();
	var buttons = [
		{
			text: 'Tirar foto',
			onClick: function () {
				deferred.resolve(camera(null));
			}
		},
		{
			text: 'Álbum de fotos',
			onClick: function () {
				deferred.resolve(camera("album"));
			}
		},
		{
			text: 'Cancelar',
			color: 'red'
		},
	];
	myApp.actions(this,buttons);
	return deferred.promise();
}

//CAMERA
function camera(type){
	var deferred = $.Deferred();
	if(type=="album"){
		navigator.camera.getPicture(success, error,{quality: 75,targetWidth:800,targetHeight:600,destinationType: Camera.DestinationType.FILE_URI,sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM});
	}else{
		navigator.camera.getPicture(success, error,{quality: 75,targetWidth:800,targetHeight:600,destinationType: Camera.DestinationType.FILE_URI,sourceType: Camera.PictureSourceType.CAMERA});
	}
	function success(image) {
		//localStorage.setItem("camera",JSON.stringify(image));
		//upload(image,route,id)
		var response = {};
			response.status = true;
			response.file = image;
		deferred.resolve(response);
	}
	function error(message) {
		console.log('Failed because: ' + message);
		var response = {};
			response.status = false;
			response.msg = message;
		deferred.resolve(response);
	}
	return deferred.promise();
}

