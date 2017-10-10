//TELA INICIAL
App.prototype.HomeScreen = function() {
	var self = this;

	//ESCONDE SPLASH
	if(navigator.splashscreen){
		navigator.splashscreen.hide();
	}

	//BOTAO DO LOGOUT
	$("#btnLogout").unbind('click touch').on('click touch', self.LogoutAction.bind(self));

	self.HomeListar();
};

//LISTAR CLIENTES
App.prototype.HomeListar = function() {
	var self = this;
	var ClienteScreenResult = window.Cliente.read();
	ClienteScreenResult.then(function(result) {
		if(result.status==true){
			$.get("templates/HomeListar.html", function(temp) {
				var div = $("#HomeListar");
					div.html("");
				var compiledTemplate = Template7.compile(temp);
				var html = compiledTemplate(result.obj);
				div.html(html);

				var mySearchbar = myApp.searchbar('.searchbarHome', {
					searchList: '.list-block-search',
					searchIn: '.item-title'
				});  

			});
		}else{
			self.RefreshTokenAction(result);
		}
	});

	/*
	var self = this;
	var GuiaTestesScreenResult = window.GuiaTestes.read();
	GuiaTestesScreenResult.then(function(result) {
		if(result.status==true){
			$.get("templates/GuiaTestesListar.html", function(temp) {
				var div = $("#GuiaTestesListar");
					div.html("");
				var compiledTemplate = Template7.compile(temp);
				var html = compiledTemplate(result.obj);
				div.html(html);

				var mySearchbar = myApp.searchbar('.searchbarGuiaTestes', {
					searchList: '.list-block-search',
					searchIn: '.item-title'
				});  

			});
		}else{
			self.RefreshTokenAction(result);
		}
	});		
	*/
};

