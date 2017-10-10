//UPLOAD
function pluginUpload(fileURL,route,id){
	var deferred = $.Deferred();
	//curl -F "file=@/home/gallo/Downloads/teste.png" http://45.55.82.201/tbl/public/api/v1.0/upload
	var success = function(result) {
		//console.log(JSON.stringify(result));
		var response = {};
			response.status = true;
			response.obj = result;
		deferred.resolve(response);
	}
	var error = function (result) {
		//console.log(JSON.stringify(result));
		var response = {};
			response.status = false;
			response.msg = result.responseJSON.error;
		deferred.resolve(response);
	}

	var fileUpload = new FileUploadOptions();
		fileUpload.fileKey = "imagem";
		fileUpload.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
		fileUpload.mimeType = "text/plain";
	var params = {};
		params.id = id;
		params._method = "PUT";
		fileUpload.params = params;
	var ft = new FileTransfer();
		ft.onprogress = function(progressEvent) {
		if(progressEvent.lengthComputable) {
			var progress = ((progressEvent.loaded / progressEvent.total)*100).toFixed(0);
			//console.log(progress);
			progressBar(progress);
		}
	};
	ft.upload(fileURL, encodeURI(urlApi+route+"/update_file/"+id+"?token="+localStorage.token), success, error, fileUpload);
	return deferred.promise();
}

function progressBar(progress){
	if($(".progressbar")){
		myApp.setProgressbar(".progressbar", progress, 600);
	}
}
