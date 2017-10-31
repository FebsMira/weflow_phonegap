//TELA INICIAL
App.prototype.HomeScreen = function() {
	var self = this;

	//ESCONDE SPLASH
	if(navigator.splashscreen){
		navigator.splashscreen.hide();
	}

	//BOTAO DO LOGOUT
	$("#btnLogout").unbind('click touch').on('click touch', self.LogoutAction.bind(self));

	//self.HomeListar();
};
