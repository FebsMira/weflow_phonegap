function Usuario() {
}

//LOGIN
Usuario.prototype.login = function(email,password) {
	return window.App.GenericLogin("customerLoginForm/PostAuthenticate/0/",email,password);
};

//REGISTER
Usuario.prototype.register = function(email,password,name) {
	return window.App.GenericRegister("customerLoginForm/PostNewLogin/0/",email,password);
};

//LOGOUT
Usuario.prototype.logout = function() {
	var deferred = $.Deferred();
		deferred.resolve(true);
	return deferred.promise();
};
