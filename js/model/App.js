function App() {
	this.defaultMsgTitle="Aviso";
	this.defaultMsgConfirmDelete="Deseja mesmo apagar?";
	this.defaultMsgSuccess="Alterações salvas com sucesso";
	this.msgSessaoSuccesso="Sessão salva com sucesso";
	this.msgMetaSuccesso="Metas salvas com sucesso";
	this.defaultMsgError="Ocorreu um erro";
	this.cepMsgError="CEP não encontrado";
	this.fillEmailMsgError="Preencha o campo de email";
	this.fillPasswordMsgError="Preencha o campo de senha";
	this.tokenMsgError="Token inválido";
	this.defaultHoldNotificationTimer="1500";
	//this.defaultLoading="<div class='defaultLoading'><i class='fa fa-spinner fa-spin fa-3x fa-fw'></i></div>";
	this.defaultLoading="<div class='defaultLoading'><div class='progressbar-infinite'></div></div>";
	this.Index();
	//this.GenericErrorHandler();
}

//ERROR HANDLER
/*
App.prototype.GenericErrorHandler = function() {
	var self = this;
	$.ajaxSetup({
		error : function(jqXHR, textStatus, errorThrown) {
			//console.log(jqXHR);
		},
		statusCode : {
			401: function(){self.RefreshTokenAction();}
		}
	});
};
*/

//LOGIN
App.prototype.GenericLogin = function(route,email,password) {
	var deferred = $.Deferred();
	var response = {};
	if(!email){
		response.status = false;
		response.msg = window.App.fillEmailMsgError;
		deferred.resolve(response);
	}else if(!password){
		response.status = false;
		response.msg = window.App.fillPasswordMsgError;
		deferred.resolve(response);
	}else{
		var data = {};
			data.email = email;
			data.password = password;
		var request = $.post(urlApi+route,data);
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
	}
	return deferred.promise();
};

//USER REGISTER
App.prototype.GenericRegister = function(route,email,password) {
	var deferred = $.Deferred();
	var response = {};
	if(!email){
		response.status = false;
		response.msg = window.App.fillEmailMsgError;
		deferred.resolve(response);
	}else if(!password){
		response.status = false;
		response.msg = window.App.fillPasswordMsgError;
		deferred.resolve(response);
	}else{
		var data = {};
			data.email = email;
			data.password = password;
		var request = $.post(urlApi+route,data);
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
	}
	return deferred.promise();
};

//REFRESH TOKEN
App.prototype.GenericRefreshToken = function(route) {
	var deferred = $.Deferred();
	var response = {};
	if(!localStorage.token){
		response.status = false;
		response.msg = window.App.tokenMsgError;
		deferred.resolve(response);
	}else{
		var request = $.get(urlApi+route+"?token="+localStorage.token);
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
	}
	return deferred.promise();
};

//LEITURA
App.prototype.GenericRead = function(route,id=null) {
	var deferred = $.Deferred();
	var response = {};
	if(id){
		var request = $.get(urlApi+route+"/"+id+"?token="+localStorage.token);
	}else{
		var request = $.get(urlApi+route+"?token="+localStorage.token);
	}
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

//REGISTRO
App.prototype.GenericCreate = function(route,formData) {
	var deferred = $.Deferred();
	var response = {};
	var data = formData;
		data.status = 1;
	var request = $.post(urlApi+route+"?token="+localStorage.token,data);
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

//UPDATE
App.prototype.GenericUpdate = function(route,id,formData) {
	var deferred = $.Deferred();
	var response = {};
	var data = formData;
		data.status = 1;
		data._method = "PUT";
	var request = $.post(urlApi+route+"/"+id+"?token="+localStorage.token,data);
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


//DELETE
App.prototype.GenericDelete = function(route,id) {
	var deferred = $.Deferred();
	var response = {};
	var data = {};
		data._method = "DELETE";
	var request = $.post(urlApi+route+"/"+id+"?token="+localStorage.token,data);
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

//DELETE FILE
App.prototype.GenericDeleteFile = function(route,id,formData=null) {
	var deferred = $.Deferred();
	var response = {};
	if(!formData){
		formData={};
	}
	var data = formData;
		data.status = 1;
		data._method = "PUT";
	var request = $.post(urlApi+route+"/update_file/"+id+"?token="+localStorage.token,data);
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



