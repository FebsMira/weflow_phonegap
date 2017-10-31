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
}

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
			data.mail = email;
			data.password = password;
			data.guid = "";
			data.languageID = 1;

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
	}
	return deferred.promise();
};

//USER REGISTER
App.prototype.GenericRegister = function(route,email,password,name) {
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
			data.customerID="0";
			data.fullname=name;
			data.mail=email;
			data.password=password;
			data.facebookID="";
			data.tokenID="";
			data.guid="";
			data.deviceID="1";
			data.birthday="";
			data.languageID="1";
			data.picture="";

			data.mail = email;
			data.password = password;
			data.guid = "";
			data.languageID = 1;

		var request = $.post(urlApi+route,JSON.stringify(data));
		//var request = $.post(urlApi+route,data);
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
