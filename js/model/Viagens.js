function Viagens() {
}

//Listar viagens
App.prototype.listar = function(){
	var route = "/customerTrip/PostGetTrip/0/";
	var deferred = $.Deferred();
	var response = {};
	var data = {};
		data.customerID = "3181";
		data.type = 0;
		data.languageID = 0;
	var request = $.post(urlApi+route,JSON.stringify(data));
		request.done(function(result) {
			response.status = true;
			response.obj = result;
			deferred.resolve(response);
		});
		request.error(function(result) {
			response.status = false;
			response.msg = "";
			if(result.responseJSON){
				response.msg = result.responseJSON.error;
			}
			deferred.resolve(response);
		});
	return deferred.promise();
};
